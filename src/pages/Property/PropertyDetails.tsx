import React, { ReactNode, useEffect, useState } from "react";
import { IonHeader, IonToolbar, IonContent, IonFooter, IonMenuButton, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { Header } from "../Layout/Header/Header";
import FNButton from "../../components/UIComponents/Form/FNButton/FNButton";
import FNCard from "../../components/UIComponents/Panel/FNCard/FNCard";
import { Chip } from "primereact/chip";
import { Tag } from "primereact/tag";
import { Skeleton } from "primereact/skeleton";
import { AppDispatch, RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import FNConfirmDialog from "../../components/UIComponents/Panel/FNConfirmDialog/FNConfirmDialog";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { DataView } from 'primereact/dataview';
import { useDispatch, useSelector } from "react-redux";
import './PropertyDetails.scss';
import { Rating } from "primereact/rating";
import { logout } from "../../store/authSlice";
import { BreadCrumb } from "primereact/breadcrumb";

const PropertyDetails: React.FC = () => {

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showRentRequestDialog, setShowRentRequestDialog] = useState(false);
  const [showDeletePropertyDialog, setShowDeletePropertyDialog] = useState(false);
  const dynamicContent = useSelector((state: RootState) => state.dynamicContent);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [items, setItems] = useState<any[]>([{ label: "Property Details", url: "/property-details" }]);

  const requestRent = {
    header: t("propertyDetails.requestRentHeader"),
    content: <div className="p-4">{t("propertyDetails.requestRentContent")}</div>,
    acceptLabel: 'Send',
    rejectLabel: 'Cancel',
  };

  const deleteProperty = {
    header: t("propertyDetails.deletePropertyHeader"),
    content: <div className="p-4">{t("propertyDetails.deletePropertyContent")}</div>,
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
  };

  const customizedMarker = (item: any) => {
    return (
      <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
        <i className={item.icon}></i>
      </span>
    );
  };

  const customizedContent = (item: any) => {
    return (
      <Card title={item.status} subTitle={item.date}>
        <p>{item.description}</p>
        <Button label="Read more" className="p-button-text"></Button>
      </Card>
    );
  };
  const itemTemplate = (tenant: any, index: number) => {
    return (
      <div key={index}>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-2xl font-bold text-900">{tenant.name}</div>
            <div className="flex align-items-center gap-3">
              <i className="pi pi-phone"></i>
              <span>{tenant.phone}</span>
            </div>
            <div className="flex align-items-center gap-3">
              <i className="pi pi-map-marker"></i>
              <span>{tenant.address}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (tenant: any[], layout?: "list" | "grid") => {
    if (tenant && tenant.length > 0) {
      let list: ReactNode[];
      list = tenant.map((t, i) => {
        return itemTemplate(t, i);
      });
      return list;
    }
  };

  const sendRentRequest = () => {
    console.log('######## sendRentRequest');
    setShowRentRequestDialog(false);
  }

  const proceedDeleteProperty = () => {
    console.log('######## proceedDeleteProperty');
    setShowDeletePropertyDialog(false);
    console.log("before logout ############## ", user);
    dispatch(logout());
    console.log("after logout ############## ", user);
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <Header
            sidebarVisible={sidebarVisible}
            setSidebarVisible={setSidebarVisible}
          />
          <IonMenuButton />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="grid overflow-y-auto p-4" id="property-image">
          <div className="col-12 sm:block hidden">
            <div className="border-0">
              <BreadCrumb model={items} home={{ icon: "pi pi-home", url: "/" }} />
            </div>
          </div>
          <div className="col-12">
            <img className="w-full h-auto border-round-top" src={dynamicContent.propertyImage} alt={t("propertyDetails.propertyImageAlt")} />
            <FNCard className="border-round-sm">
              <div className="flex flex-column justify-content-between">
                <div className="text-3xl font-bold">{dynamicContent.propertyName} </div>
                <div className="text-600">{dynamicContent.propertyType}</div>
                <div className="flex justify-content-between align-items-center mt-4">
                  <div className="text-3xl text-600">{dynamicContent.propertyPrice}</div>
                  <Rating value={dynamicContent.rating} disabled cancel={false} />
                </div>
              </div>
              <div className="text-gray-500">
                <p>{dynamicContent.propertyAddress}</p>
              </div>
              <div>
                {dynamicContent.propertyDescription}
              </div>
            </FNCard>
          </div>
          <div className="col-12 flex flex-column" id="lease-info">
            <FNCard className="border-round-sm" header={<div className="p-3 text-2xl text-primary">{t("propertyDetails.leaseInfoHeader")}</div>}>
              <div>
                {t("propertyDetails.startDate")} {dynamicContent.leaseInfo.startDate} {t("propertyDetails.endDate")} {dynamicContent.leaseInfo.endDate}
              </div>
            </FNCard>
          </div>
          <div className="col-12 flex flex-column" id="tenant">
            <FNCard className="border-round-sm" header={<div className="p-3 text-2xl text-primary">{t("propertyDetails.tenantHeader")}</div>}>
              <DataView value={dynamicContent.tenantInfo} listTemplate={listTemplate} />
              <div className="mt-4">
                <FNButton label={t("propertyDetails.addTenantButton")} className="w-full" />
              </div>
            </FNCard>
          </div>
          <div className="col-12 flex flex-column" id="activity">
            <FNCard className="border-round-sm" header={<div className="p-3 text-2xl text-primary">{t("propertyDetails.activityHeader")}</div>}>
              <div className="w-full overflow-auto">
                <Timeline
                  value={dynamicContent.activities}
                  align="alternate"
                  className="customized-timeline"
                  marker={customizedMarker}
                  content={customizedContent} />
              </div>
              <div className="flex justify-content-between mt-4 gap-4">
                <FNButton label={t("propertyDetails.requestRentButton")} onClick={() => setShowRentRequestDialog(true)} />
                <FNButton label={t("propertyDetails.editButton")} />
                <FNButton label={t("propertyDetails.deleteButton")} onClick={() => setShowDeletePropertyDialog(true)} />
              </div>
            </FNCard>
          </div>
        </div>
      </IonContent >
      <IonFooter className="sm:hidden block">
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <i className="pi pi-home"></i>
            <IonLabel>{t("propertyDetails.homeTab")}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="property" href="/property-details">
            <i className="pi pi-warehouse"></i>
            <IonLabel>{t("propertyDetails.propertyTab")}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="history" href="/history">
            <i className="pi pi-history"></i>
            <IonLabel>{t("propertyDetails.historyTab")}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <i className="pi pi-user"></i>
            <IonLabel>{t("propertyDetails.profileTab")}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
      <FNConfirmDialog
        header={requestRent.header}
        message={requestRent.content}
        accept={() => sendRentRequest()}
        reject={() => setShowRentRequestDialog(false)}
        acceptLabel={requestRent.acceptLabel}
        rejectLabel={requestRent.rejectLabel}
        visible={showRentRequestDialog} />
      <FNConfirmDialog
        header={deleteProperty.header}
        message={deleteProperty.content}
        accept={() => proceedDeleteProperty()}
        reject={() => setShowDeletePropertyDialog(false)}
        acceptLabel={deleteProperty.acceptLabel}
        rejectLabel={deleteProperty.rejectLabel}
        visible={showDeletePropertyDialog} />
    </>
  );
};

export default PropertyDetails;
