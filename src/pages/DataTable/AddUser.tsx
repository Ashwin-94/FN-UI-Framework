import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addToast } from "../../store/toastSlice";
import FNInput from "../../components/UIComponents/Form/FNInput/FNInput";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Button } from "primereact/button";
import FNDialog from "../../components/UIComponents/Panel/FNDialog/FNDialog";
import ApiService from "../../services/ApiServices";
import { urlConfig } from "../../services/Utils/ApiUrlConfig";

interface AddUserProps {
    onAddUserEmit: () => void; 
}

const AddUser: React.FC<AddUserProps> = ({ onAddUserEmit }) => {
    const { loading, error } = useSelector((state: RootState) => state.persistedReducer.auth);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    useTranslation();

    interface AddUserFormValues {
        firstName: string,
        lastName: string,
        email: string,
    }

    const addUserFormik = useFormik<AddUserFormValues>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
        }),
        onSubmit: (values) => {
            addUser(values);
        },
    });

    const addUser = (values: AddUserFormValues) => {
        try {
            const userPayload = {
                ...values
            };
            ApiService.post<any[]>(urlConfig.addUser, userPayload).then(response => {
                if (response && response.data) {
                    dispatch(addToast({ id: new Date().getTime(), message: 'User Created Successfully !', severity: 'success' }));
                    setVisible(false);
                    onAddUserEmit(); // Notify the parent component
                }
            })
            .catch(error => {
                dispatch(addToast({ id: new Date().getTime(), message: 'Error Creating User', severity: 'error' }));
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div className="card flex justify-content-end mb-2">
            <Button
                label={t("Dialog.buttonLabel")}
                icon="pi pi-external-link"
                onClick={() => setVisible(true)}
            />
            <FNDialog
                header={t("Dialog.header")}
                content={
                    <form className="grid">
                        <div className="col-4">
                            <FNInput
                                type="text"
                                name="firstName"
                                label="First Name"
                                value={addUserFormik.values.firstName}
                                onChange={addUserFormik.handleChange}
                                onBlur={addUserFormik.handleBlur}
                                invalid={
                                    addUserFormik.touched.firstName &&
                                    !!addUserFormik.errors.firstName
                                }
                                helpText={
                                    addUserFormik.touched.firstName &&
                                    addUserFormik.errors.firstName
                                }
                            />
                        </div>
                        <div className="col-4">
                            <FNInput
                                type="text"
                                name="lastName"
                                label="Last Name"
                                value={addUserFormik.values.lastName}
                                onChange={addUserFormik.handleChange}
                                onBlur={addUserFormik.handleBlur}
                                invalid={
                                    addUserFormik.touched.lastName &&
                                    !!addUserFormik.errors.lastName
                                }
                                helpText={
                                    addUserFormik.touched.lastName && addUserFormik.errors.lastName
                                }
                            />
                        </div>
                        <div className="col-4">
                            <FNInput
                                type="email"
                                name="email"
                                label="Email"
                                value={addUserFormik.values.email}
                                onChange={addUserFormik.handleChange}
                                onBlur={addUserFormik.handleBlur}
                                invalid={
                                    addUserFormik.touched.email && !!addUserFormik.errors.email
                                }
                                helpText={
                                    addUserFormik.touched.email && addUserFormik.errors.email
                                }
                            />
                        </div>

                        {error && <div className="col-span-3 text-red-400">{error}</div>}
                    </form>}
                footerButtons={[
                    {
                        label: t("Dialog.rejectButton"),
                        icon: "pi pi-times",
                        onClick: () => setVisible(false),
                        className: "p-button-text",
                    },
                    {
                        label: t("Dialog.confirmButton"),
                        icon: "pi pi-check",
                        onClick: () => addUserFormik.handleSubmit(),
                    },
                ]}
                visible={visible}
                onHide={() => setVisible(false)}
                style={{ width: "60vw" }}
                className="my-custom-dialog"
            />
        </div>
    )
};

export default AddUser;
