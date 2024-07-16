import { Badge } from "primereact/badge";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserTable from "../pages/DataTable/UserTable";
import FormComponents from "../pages/Form/FormComponents";
import { Link } from 'react-router-dom';

export interface Breadcrumb {
  label?: string;
  url?: string;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  url?: string;
  access: string[];
  items?: MenuItem[];
  component?: React.ComponentType<any>;
  breadcrumb?: Breadcrumb[];
  // template?: (item: any, options: any) => JSX.Element;
}

export interface Menu {
  separator?: boolean;
  label?: string;
  icon?: string;
  url?: string;
  access: string[];
  items?: MenuItem[];
  component?: React.ComponentType<any>;
  breadcrumb?: Breadcrumb[];
  // template?: (item: any, options: any) => JSX.Element;
}

const menuJson: Menu[] = [
  {
    label: "Dashboard",
    icon: "pi pi-home",
    url: "/dashboard",
    access: ["admin"],
    component: Dashboard,
    breadcrumb: [{ label: "Dashboard", url: "/dashboard" }],
  },
  {
    label: "Data",
    icon: "pi pi-database",
    access: ["admin"],
    items: [
      {
        label: "Table",
        icon: "pi pi-table",
        url: "/data/table",
        access: ["admin"],
        component: UserTable,
        breadcrumb: [
          { label: "Data", url: "/data" },
          { label: "Table", url: "/table" },
        ],
      },
    ],
  },
  {
    label: "Form",
    icon: "pi pi-receipt",
    access: ["admin"],
    items: [
      {
        label: "Components",
        icon: "pi pi-microchip",
        url: "/form/components",
        access: ["admin"],
        component: FormComponents,
        breadcrumb: [
          { label: "Form", url: "/form" },
          { label: "Components", url: "/components" },
        ],
      },
    ],
  },
  {
    separator: true,
    access: ["admin"]
  },
  {
    label: "Share",
    icon: "pi pi-share-alt",
    access: ["admin"],
    items: [
      {
        label: "Slack",
        icon: "pi pi-slack",
        access: ["admin"],
      },
      {
        label: "Whatsapp",
        icon: "pi pi-whatsapp",
        access: ["admin"],
      },
    ],
  },
  {
    label: "Property Details",
    icon: "pi pi-warehouse",
    access: ["admin"],
    url: "/property-details"
  },
];

function filterMenuByAccess(menu: Menu[], role: string): Menu[] {
  return menu
    .map((item) => {
      if (item.items) {
        const filteredItems = filterMenuByAccess(item.items, role);
        if (filteredItems.length > 0) {
          return { ...item, items: filteredItems };
        }
      }
      if (item.url && item.access?.includes(role)) {
        return item;
      }
      if (item.separator) {
        return item;
      }
      return null;
    })
    .filter((item) => item !== null) as Menu[];
}

function filterRouteData(menu: Menu[], accessRole: string) {
  const result: Menu[] = [];

  menu.forEach(item => {
    if (item.access && item.access.includes(accessRole)) {
      if (item.url && item.component && item.breadcrumb) {
        result.push(item);
      }
    }

    if (item.items) {
      const subItems = filterRouteData(item.items, accessRole);
      result.push(...subItems);
    }
  });

  return result;
}

// Example usage
const userRole = "admin"; // localStorage.getItem('userRole') || "";
export const filteredMenu = filterMenuByAccess(menuJson, userRole);
export const filteredRouteData = filterRouteData(menuJson, userRole);
export default menuJson;
