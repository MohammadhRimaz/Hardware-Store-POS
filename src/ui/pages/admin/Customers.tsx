import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useCustomers } from "../../hooks/useCustomers";

export default function Customers() {
  const { data: customers, loading, error } = useCustomers();

  if (loading) {
    return <Typography>Loading customers...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (customers.length === 0) {
    return <Typography>No customers found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>

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
            {customers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.phone ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
