import React, { useState } from "react";
import { DataTable, DataTableProps } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
export interface FNDataTableProps {
  alwaysShowPaginator?: boolean;
  breakpoint?: string;
  cellSelection?: boolean;
  checkIcon?: any;
  children?: React.ReactNode;
  className?: string;
  collapsedRowIcon?: any;
  columnResizeMode?: "expand" | "fit";
  compareSelectionBy?: "equals" | "deepEquals";
  contextMenuSelection?: object | null;
  currentPageReportTemplate?: string;
  dataKey?: string;
  dragSelection?: boolean;
  editingRows?: any[] | null;
  editMode?: "cell" | "row";
  emptyMessage?: React.ReactNode | Function | null | any;
  expandableRowGroups?: boolean;
  expandedRowIcon?: any;
  expandedRows?: any[] | null;
  exportFilename?: string;
  filterClearIcon?: any;
  filterDelay?: number;
  dynamicColumns?: { field: string; header: string }[];
  value: any[] | null;
  rows?: number;
  sortable?: boolean;
  globalFilterFields?: string[];
  header?: React.ReactNode;
  filter?: boolean;
  search?: boolean;
}

const FNDataTable: React.FC<FNDataTableProps> = ({
  alwaysShowPaginator = true,
  breakpoint = "960px",
  cellSelection = false,
  checkIcon = null,
  children = null,
  className = "",
  collapsedRowIcon = null,
  columnResizeMode = "fit",
  compareSelectionBy = "deepEquals",
  contextMenuSelection = null,
  currentPageReportTemplate = "({currentPage} of {totalPages})",
  dataKey = "",
  dragSelection = false,
  editingRows = null,
  editMode = "cell",
  emptyMessage = "general.noRecordFound",
  expandableRowGroups = false,
  expandedRowIcon = null,
  expandedRows = null,
  exportFilename = "download",
  filterClearIcon = null,
  filterDelay = 300,
  dynamicColumns = [],
  value = [],
  rows = 10,
  sortable = false,
  globalFilterFields = [],
  header = null,
  filter = false,
  search = false,
}) => {
  const { t } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder="Search..."
          />
        </IconField>
      </div>
    );
  };

  return (
    <DataTable
      value={value}
      paginator={alwaysShowPaginator}
      breakpoint={breakpoint}
      cellSelection={cellSelection}
      checkIcon={checkIcon}
      className={className}
      collapsedRowIcon={collapsedRowIcon}
      columnResizeMode={columnResizeMode}
      compareSelectionBy={compareSelectionBy}
      contextMenuSelection={contextMenuSelection}
      currentPageReportTemplate={currentPageReportTemplate}
      dataKey={dataKey}
      dragSelection={dragSelection}
      editingRows={editingRows}
      editMode={editMode}
      emptyMessage={t(emptyMessage)}
      expandableRowGroups={expandableRowGroups}
      expandedRowIcon={expandedRowIcon}
      expandedRows={expandedRows}
      exportFilename={exportFilename}
      filterClearIcon={filterClearIcon}
      filterDelay={filterDelay}
      rows={rows}
      globalFilter={globalFilter}
      globalFilterFields={globalFilterFields}
      header={search ? renderHeader() : null}
    >
      {dynamicColumns.map((col: any) => (
        <Column
          sortable={sortable}
          key={col.field}
          field={col.field}
          header={t(col.header)}
          filter={filter}
          filterPlaceholder={`Search ${t(col.header).toLowerCase()}`}
        />
      ))}
      {children}
    </DataTable>
  );
};

export default FNDataTable;
