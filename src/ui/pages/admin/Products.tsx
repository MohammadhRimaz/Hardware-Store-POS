import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { ipc } from "../../api/ipc";
import { useCategories } from "../../hooks/useCategories";

export default function Products() {
  const { data: products, loading, error, refresh } = useProducts();
  const { data: categories } = useCategories();
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");

  async function handleCreateProduct() {
    setFormError(null);

    if (!name.trim()) {
      setFormError("Product name is required");
      return;
    }

    if (!categoryId) {
      setFormError("Category is required");
      return;
    }

    const sale = Number(salePrice);
    const qty = Number(stock);

    if (!Number.isFinite(sale) || sale <= 0) {
      setFormError("Sale price must be greater than zero");
      return;
    }

    if (!Number.isInteger(qty) || qty < 0) {
      setFormError("Stock must be a non-negative integer");
      return;
    }

    try {
      await ipc.createProduct({
        name,
        brand: brand || undefined,
        category_id: categoryId,
        sale_price: sale,
        stock_quantity: qty,
        cost_price: 0, // Placeholder, adjust as needed
        reorder_level: 5,
      });

      // Clear form
      setName("");
      setBrand("");
      setCategoryId("");
      setSalePrice("");
      setStock("");

      // Refresh product list
      await refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create product");
    }
  }

  if (loading)
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      {/* Create Product Form */}
      <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
        <Typography variant="subtitle1" gutterBottom>
          Add Product
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
            sx={{ minWidth: 180 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Sale Price"
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            required
          />

          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <Button
            variant="contained"
            onClick={handleCreateProduct}
            sx={{ alignSelf: "center" }}
          >
            Create
          </Button>
        </Stack>
      </Paper>

      {/* Products Table */}
      {products.length === 0 ? (
        <Typography>No products found. Add your first one above!</Typography>
      ) : (
        <Paper elevation={1}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Sale Price</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category_name}</TableCell>
                  <TableCell>{p.brand ?? "-"}</TableCell>
                  <TableCell>{p.stock_quantity}</TableCell>
                  <TableCell>{p.sale_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
