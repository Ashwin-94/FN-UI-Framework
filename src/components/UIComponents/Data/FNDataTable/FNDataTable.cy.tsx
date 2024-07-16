import { mount } from "@cypress/react";
import FNDataTable, { FNDataTableProps } from "./FNDataTable";

// Define columns dynamically based on your API response
const dynamicColumns = [
  { field: "id", header: "ID" },
  { field: "name", header: "Name" },
  { field: "phonenumber", header: "Phone Number" },
  { field: "createdAt", header: "Created At" },
];
const dataTableProps: FNDataTableProps = {
  value: [
    {
      id: 1,
      name: "John Doe",
      phonenumber: "123-456-7890",
      createdAt: "2023-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      phonenumber: "987-654-3210",
      createdAt: "2023-02-01",
    },
    {
      id: 3,
      name: "Mike Berge",
      phonenumber: "123-456-7890",
      createdAt: "2023-03-01",
    },
    {
      id: 4,
      name: "Karl Romaguera",
      phonenumber: "987-654-3210",
      createdAt: "2023-04-01",
    },
    {
      id: 5,
      name: "Elmer Dache",
      phonenumber: "123-456-7890",
      createdAt: "2023-05-01",
    },
    {
      id: 6,
      name: "Kelly Stark",
      phonenumber: "987-654-3210",
      createdAt: "2023-06-01",
    },
    {
      id: 7,
      name: "Wilson Gerhold",
      phonenumber: "123-456-7890",
      createdAt: "2023-07-01",
    },
    {
      id: 8,
      name: "Valerie Oberbrunner",
      phonenumber: "987-654-3210",
      createdAt: "2023-08-01",
    },
  ],
  dynamicColumns: dynamicColumns,
  emptyMessage: "general.noRecordFound", // Example translation key for empty message
  rows: 5,
  sortable: true,
  globalFilterFields: ["id", "name", "phonenumber", "createdAt"],
  filter: true,
  search: true,
};
const sampleTableProps: FNDataTableProps = {
  dynamicColumns: [
    { field: "name", header: "Name" },
    { field: "age", header: "Age" },
  ],
  value: [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
  ],
};
const paginationTableProps: FNDataTableProps = {
  dynamicColumns: [
    { field: "name", header: "Name" },
    { field: "age", header: "Age" },
  ],
  value: [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
    { name: "Alice Johnson", age: 28 },
    { name: "Bob Brown", age: 35 },
    { name: "Charlie Davis", age: 40 },
    { name: "Daniel Evans", age: 22 },
  ],
  rows: 2, // Number of rows per page
};
const sortingTableProps: FNDataTableProps = {
  dynamicColumns: [
    { field: "name", header: "Name" },
    { field: "age", header: "Age" },
  ],
  value: [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
    { name: "Alice Johnson", age: 28 },
    { name: "Bob Brown", age: 35 },
    { name: "Charlie Davis", age: 40 },
    { name: "Daniel Evans", age: 22 },
  ],
  rows: 6, // Show all rows to test sorting easily
  sortable: true,
};
describe("<FNDataTable />", () => {
  it("render Table", () => {
    mount(<FNDataTable {...dataTableProps} />);
    cy.screenshot("component/FNDataTable/renders");
  });

  it("should render the data table with correct headers and rows", () => {
    mount(<FNDataTable {...sampleTableProps} />);
    // Check if the table headers are rendered correctly
    cy.get("thead.p-datatable-thead th").should("have.length", 2);
    cy.get("thead.p-datatable-thead th").eq(0).should("contain.text", "Name");
    cy.get("thead.p-datatable-thead th").eq(1).should("contain.text", "Age");

    // Check if the table rows are rendered correctly
    cy.get("tbody.p-datatable-tbody tr").should("have.length", 2);
    cy.get("tbody.p-datatable-tbody tr")
      .eq(0)
      .should("contain.text", "John Doe")
      .and("contain.text", "30");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(1)
      .should("contain.text", "Jane Smith")
      .and("contain.text", "25");
    cy.screenshot("component/FNDataTable/renders");
  });
  it("should filter the data table based on search input", () => {
    mount(<FNDataTable {...dataTableProps} />);
    // Assuming the search input is implemented correctly
    cy.get('input[type="search"]').type("Jane");

    // Verify that only the matching row is displayed
    cy.get("tbody.p-datatable-tbody tr").should("have.length", 1);
    cy.get("tbody.p-datatable-tbody tr")
      .first()
      .should("contain.text", "Jane Smith")
      .and("contain.text", "987-654-3210");
    cy.screenshot("component/FNDataTable/renders");
  });

  it("should display paginator and be disabled initially", () => {
    mount(<FNDataTable {...sampleTableProps} />);
    // Check if paginator buttons are rendered and disabled
    cy.get(".p-paginator-first").should("be.disabled");
    cy.get(".p-paginator-prev").should("be.disabled");
    cy.get(".p-paginator-next").should("be.disabled");
    cy.get(".p-paginator-last").should("be.disabled");
    cy.screenshot("component/FNDataTable/renders");
  });
  it("should render the data table with pagination and navigate correctly", () => {
    mount(<FNDataTable {...paginationTableProps} />);

    // Check if the table displays the correct number of rows per page
    cy.get("tbody.p-datatable-tbody tr").should("have.length", 2);
    cy.get("tbody.p-datatable-tbody tr")
      .eq(0)
      .should("contain.text", "John Doe")
      .and("contain.text", "30");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(1)
      .should("contain.text", "Jane Smith")
      .and("contain.text", "25");

    // Navigate to the next page
    cy.get(".p-paginator-next").click();

    // Verify the table displays the next set of rows
    cy.get("tbody.p-datatable-tbody tr").should("have.length", 2);
    cy.get("tbody.p-datatable-tbody tr")
      .eq(0)
      .should("contain.text", "Alice Johnson")
      .and("contain.text", "28");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(1)
      .should("contain.text", "Bob Brown")
      .and("contain.text", "35");

    // Navigate to the last page
    cy.get(".p-paginator-next").click();

    // Verify the table displays the last set of rows
    cy.get("tbody.p-datatable-tbody tr").should("have.length", 2);
    cy.get("tbody.p-datatable-tbody tr")
      .eq(0)
      .should("contain.text", "Charlie Davis")
      .and("contain.text", "40");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(1)
      .should("contain.text", "Daniel Evans")
      .and("contain.text", "22");

    // Navigate back to the first page
    cy.get(".p-paginator-first").click();

    // Verify the table displays the first set of rows again
    cy.get("tbody.p-datatable-tbody tr").should("have.length", 2);
    cy.get("tbody.p-datatable-tbody tr")
      .eq(0)
      .should("contain.text", "John Doe")
      .and("contain.text", "30");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(1)
      .should("contain.text", "Jane Smith")
      .and("contain.text", "25");
    cy.screenshot("component/FNDataTable/renders");
  });
  it("should render the data table with sorting and sort correctly by Name", () => {
    mount(<FNDataTable {...sortingTableProps} />);

    // Check initial sorting by Name (ascending)
    cy.get("tbody.p-datatable-tbody tr")
      .eq(0)
      .should("contain.text", "John Doe");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(1)
      .should("contain.text", "Jane Smith");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(2)
      .should("contain.text", "Alice Johnson");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(3)
      .should("contain.text", "Bob Brown");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(4)
      .should("contain.text", "Charlie Davis");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(5)
      .should("contain.text", "Daniel Evans");

    // Click on the Name column header to sort descending
    cy.get("th").contains("Name").click();

    // Check sorting by Name (descending)
    cy.get("tbody.p-datatable-tbody tr")
      .eq(0)
      .should("contain.text", "Alice Johnson");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(1)
      .should("contain.text", "Bob Brown");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(2)
      .should("contain.text", "Charlie Davis");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(3)
      .should("contain.text", "Daniel Evans");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(4)
      .should("contain.text", "Jane Smith");
    cy.get("tbody.p-datatable-tbody tr")
      .eq(5)
      .should("contain.text", "John Doe");
    cy.screenshot("component/FNDataTable/renders");
  });
});
