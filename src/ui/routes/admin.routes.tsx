import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";

import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import Products from "../pages/admin/Products";
import Customers from "../pages/admin/Customers";

export const adminRoutes = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
    element: <Dashboard />,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: <CategoryIcon />,
    element: <Categories />,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <InventoryIcon />,
    element: <Products />,
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: <PeopleIcon />,
    element: <Customers />,
  },
];
