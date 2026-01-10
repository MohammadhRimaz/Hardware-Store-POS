import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./ui/layouts/AdminLayout";
import POSLayout from "./ui/layouts/POSLayout";
import { adminRoutes } from "./ui/routes/admin.routes";

function App() {
  useEffect(() => {
    window.api.getCategories().then(console.log);
    window.api.getProducts().then(console.log);
    window.api.getCustomers().then(console.log);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path.replace("/admin", "")}
              element={route.element}
            />
          ))}
        </Route>

        <Route path="/pos" element={<POSLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
