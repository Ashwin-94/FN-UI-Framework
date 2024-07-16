import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ApiService from "../../services/ApiServices";
import FNDataTable, {
  FNDataTableProps,
} from "../../components/UIComponents/Data/FNDataTable/FNDataTable";
import FNCard from "../../components/UIComponents/Panel/FNCard/FNCard";
import { Button } from "primereact/button";
import FNDialog from "../../components/UIComponents/Panel/FNDialog/FNDialog";
import { t } from "i18next";
import { urlConfig } from "../../services/Utils/ApiUrlConfig";
import AddUser from "./AddUser";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  useTranslation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await ApiService.get<any[]>(urlConfig.userList);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Define columns dynamically based on your API response
  const dynamicColumns = [
    { field: "id", header: "ID" },
    { field: "firstName", header: "Name" },
    { field: "email", header: "Email" }
  ];

  const dataTableProps: FNDataTableProps = {
    value: users,
    dynamicColumns: dynamicColumns,
    emptyMessage: "general.noRecordFound", // Example translation key for empty message
    rows: 5,
    sortable: true,
    globalFilterFields: ["id", "name", "phonenumber", "createdAt"],
    filter: true,
    search: true,
  };

  return (
    <div>
      {/* dialog component content */}
      <AddUser onAddUserEmit={fetchUsers} />
      {/* dialog component content end */}

      <FNCard title="User Table">
        <FNDataTable {...dataTableProps} />
      </FNCard>
    </div>
  );
};

export default UserTable;
