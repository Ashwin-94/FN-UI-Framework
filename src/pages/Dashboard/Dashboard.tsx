import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import React from "react";
import UserTable from "./UserTable";
import FNCard from "../../components/Panel/FNCard/FNCard";
import FNAccordion, {
  TabData,
} from "../../components/Panel/FNAccordion/FNAccordion";
const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const tabs: TabData[] = [
    { header: "Header 1", content: <p>Content for the first tab</p> },
    { header: "Header 2", content: <p>Content for the second tab</p> },
    {
      header: "Header 3",
      content: <p>Content for the third tab</p>,
      disabled: true,
    },
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("general.appTitle")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t("general.appTitle")}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* accordion element */}
        <div className="m-3">
          <FNAccordion tabs={tabs} />
        </div>
        {/* end */}
        <div className="w-10 flex mt-3 justify-content-center">
          <FNCard title={t("usersTable.title")}>
            <UserTable/>
          </FNCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
