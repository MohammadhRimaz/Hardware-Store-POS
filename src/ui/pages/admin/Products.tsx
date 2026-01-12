import { useEffect, useState } from "react";
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
} from "@mui/material";
import { ipc } from "../../api/ipc";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  brand?: string;
  category_name: string;
  stock_quantity: number;
  sale_price: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");

  async function loadData() {
    try {
      const [productRes, categoryRes] = await Promise.all([
        ipc.getProducts(),
        ipc.getCategories(),
      ]);

      setProducts(productRes);
      setCategories(categoryRes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateProduct() {
    if (!name || !categoryId || !salePrice || !stock) {
      alert("Please fill in all required fields.");
      return;
    }

    // try {
    //   await ipc.createProduct({
    //     name,
    //     brand: brand || undefined,
    //     category_id: categoryId,
    //     sale_price: salePrice,
    //     stock_quantity: stock,
    //     cost_price: 0, // Placeholder, adjust as needed
    //     reorder_level: 5,
    //   });

    //   // Clear form
    //   setName("");
    //   setBrand("");
    //   setCategoryId("");
    //   setSalePrice("");
    //   setStock("");

    //   // Refresh product list
    //   await loadData();
    // } catch(err: any){
    //   alert(err.message);
    // }
  }

  if (loading) return <Typography>Loading Products...</Typography>;

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
    </Box>
  );
}
