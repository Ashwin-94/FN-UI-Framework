import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { RootState } from "../../../store/store";
import { logout } from "../../../store/authSlice";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import Notification from "./Notification/Notification";
import logo from "../../../assets/img/logo.png";
import smlogo from "../../../assets/img/sm-logo.png";
import FNInput from "../../../components/UIComponents/Form/FNInput/FNInput";
interface HeaderProps {
  sidebarVisible: boolean;
  setSidebarVisible: any;
}
export const Header: React.FC<HeaderProps> = ({
  sidebarVisible,
  setSidebarVisible,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const sidebarElementRef: any = useRef(null);
  const userPanel: any = useRef(null);

  useEffect(() => {
    sidebarElementRef.current = document.getElementById("sidebarContainer");
  }, []);

  function logoutUser() {
    dispatch(logout());
  }

  const handleMenuHide = (event: any) => {
    if (event && event.item.label === "Logout") {
      logoutUser();
    }
  };

  const userDetails = [
    {
      label: user?.scope ? user?.scope : "Guest",
      items: [
        {
          label: t("loginPage.changepassword"),
          icon: "pi pi-user-edit",
        },
        {
          label: t("loginPage.logout"),
          icon: "pi pi-sign-out",
          command: handleMenuHide,
        },
      ],
    },
  ];

  return (
    <div className="header flex justify-content-between box-shadow-none w-screen postion-fixed border-bottom-1 border-primary-200 p-2">
      <div className="flex align-items-center gap-2">
        <Button
          icon="pi pi-bars"
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="p-button-text p-button-plain outline-none"
        />
        <img src={logo} className="h-2rem hidden sm:block" alt="logo" />
        <img src={smlogo} className="h-2rem block sm:hidden" alt="logo" />
      </div>
      <div className="flex align-items-center gap-3">
      <span className="h-2rem block font-bold text-bluegray-700 text-xl">Property Details</span>
      </div>
      <div className="flex align-items-center gap-3">
        <FNInput
          placeholder="Search"
          type="text"
          className="w-8rem sm:w-auto hidden sm:block"
          name="search"
        />
        <Notification />
        <Avatar
          icon="pi pi-user"
          shape="circle"
          className="user-icon"
          onClick={(e) => userPanel.current.toggle(e)}
        />
        <OverlayPanel className="user-panel" ref={userPanel}>
          <Menu model={userDetails} className="border-none" />
        </OverlayPanel>
      </div>
    </div>
  );
};
