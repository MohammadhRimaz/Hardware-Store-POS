import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Stack,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useCustomers } from "../../hooks/useCustomers";

export default function Customers() {
  const { customers, loading, error, createCustomer, reload } = useCustomers();

  // Form State
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleCreateCustomer() {
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      await createCustomer({
        name: name.trim(),
        contact: contact.trim() || undefined,
      });

      // Reset form
      setName("");
      setContact("");

      // Refresh customer list
      await reload();
    } catch (error: any) {
      console.error("Failed to create customer:", error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>

      {/* Create Customer */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add Customer
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleCreateCustomer}
            disabled={submitting || !name.trim()}
          >
            Add
          </Button>
        </Stack>
      </Paper>

      {/* Customers Table */}
      <Paper elevation={1}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography>No customers found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.phone ?? "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
