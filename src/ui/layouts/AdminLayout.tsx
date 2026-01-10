import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />

      <Box flex={1} display="flex" flexDirection="column">
        <Header />

        <Box component="main" flex={1} p={2} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
