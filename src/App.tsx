import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.api.getCategories().then(console.log);
    window.api.getProducts().then(console.log);
    window.api.getCustomers().then(console.log);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1>Hardware Store POS</h1>
    </div>
  );
}

export default App;
