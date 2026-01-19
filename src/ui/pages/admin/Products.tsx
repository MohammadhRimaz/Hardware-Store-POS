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
import { useProducts } from "../../hooks/useProducts";

export default function Products() {
  const { data: products, loading, error } = useProducts();

  // Form state
  // const [name, setName] = useState("");
  // const [brand, setBrand] = useState("");
  // const [categoryId, setCategoryId] = useState<number | "">("");
  // const [salePrice, setSalePrice] = useState("");
  // const [stock, setStock] = useState("");

  if (loading) return <Typography>Loading Products...</Typography>;

  if (error) return <Typography color="error">{error}</Typography>;

  if (products.length === 0) {
    return <Typography>No products found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      {/* Create Product Form */}
      {/* <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
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
      </Paper> */}

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
