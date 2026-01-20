import { useState } from "react";
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
import { useCategories } from "../../hooks/useCategories";

export default function Categories() {
  const { data: categories, loading, error, createCategory } = useCategories();
  const [newName, setNewName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleCreateCategory() {
    try {
      setSubmitting(true);
      await createCategory(newName);
      setNewName("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Typography>Loading categories...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (categories.length === 0) {
    return <Typography>No categories found.</Typography>;
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
          disabled={submitting}
        />
        <Button
          variant="contained"
          onClick={handleCreateCategory}
          disabled={submitting || !newName.trim()}
        >
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
