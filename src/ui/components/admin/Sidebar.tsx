import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRoutes } from "../../routes/admin.routes";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <List>
      {adminRoutes.map((route) => {
        const isActive = location.pathname === route.path;

        return (
          <ListItemButton
            key={route.path}
            selected={isActive}
            onClick={() => navigate(route.path)}
          >
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.label} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default Sidebar;
