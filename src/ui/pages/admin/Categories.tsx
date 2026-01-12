import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { ipc } from "../../api/ipc";

type Category = {
  id: number;
  name: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await ipc.getCategories();
      setCategories(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;

    try {
      await ipc.createCategory(newName.trim());
      setNewName("");
      await loadCategories(); // Refresh the list after creation
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) {
    return <Typography>Loading categories...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>

      {/* Create Category Form */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          size="small"
          label="Category Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreate}>
          Add
        </Button>
      </Stack>

      {/* Table */}
      <Paper elevation={1}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
