import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../services/api";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Alert,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
  status: "new" | "read" | "responded";
  response?: string;
  respondedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactsResponse {
  contacts: Contact[];
  totalPages: number;
  currentPage: number;
  total: number;
}

const ContactsTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<"new" | "read" | "responded">("read");
  const [sendEmailToUser, setSendEmailToUser] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/contact?page=${
          page + 1
        }&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data: ContactsResponse = await response.json();
      setContacts(data.contacts);
      setTotalRows(data.total);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setViewDialogOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setResponse(contact.response || "");
    setStatus(contact.status);
    setEditDialogOpen(true);
  };

  const handleUpdateContact = async () => {
    if (!selectedContact) return;

    try {
      const responseData = await fetch(
        `${API_BASE_URL}/contact/${selectedContact._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status,
            response,
            sendEmailToUser,
          }),
        }
      );

      if (!responseData.ok) {
        throw new Error("Failed to update contact");
      }

      setEditDialogOpen(false);
      fetchContacts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/${contactId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      fetchContacts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "error";
      case "read":
        return "warning";
      case "responded":
        return "success";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && contacts.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Contact Messages
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={fetchContacts} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id} hover>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber || "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      label={contact.status.toUpperCase()}
                      color={getStatusColor(contact.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(contact.createdAt)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() => handleViewContact(contact)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Response">
                      <IconButton
                        size="small"
                        onClick={() => handleEditContact(contact)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteContact(contact._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Contact Details</DialogTitle>
        <DialogContent>
          {selectedContact && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6" gutterBottom>
                {selectedContact.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email: {selectedContact.email}
              </Typography>
              {selectedContact.phoneNumber && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Phone: {selectedContact.phoneNumber}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date: {formatDate(selectedContact.createdAt)}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status:{" "}
                <Chip
                  label={selectedContact.status.toUpperCase()}
                  color={getStatusColor(selectedContact.status) as any}
                  size="small"
                />
              </Typography>

              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Message:
                </Typography>
                <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="body1">
                    {selectedContact.message}
                  </Typography>
                </Paper>
              </Box>

              {selectedContact.response && (
                <Box mt={3}>
                  <Typography variant="h6" gutterBottom>
                    Response:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: "#f0f8ff" }}>
                    <Typography variant="body1">
                      {selectedContact.response}
                    </Typography>
                    {selectedContact.respondedBy && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        mt={1}
                      >
                        Responded by: {selectedContact.respondedBy.name} on{" "}
                        {selectedContact.respondedAt
                          ? formatDate(selectedContact.respondedAt)
                          : "Unknown date"}
                      </Typography>
                    )}
                  </Paper>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Update Contact</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) =>
                  setStatus(e.target.value as "new" | "read" | "responded")
                }
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="read">Read</MenuItem>
                <MenuItem value="responded">Responded</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Response"
              multiline
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Enter your response to the customer..."
            />

            {status === "responded" && selectedContact?.email && (
              <FormControl component="fieldset" variant="standard">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={sendEmailToUser}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendEmailToUser(e.target.checked)}
                  />
                  <Typography>
                    Send this response via email to {selectedContact.email}
                  </Typography>
                </Box>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateContact} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactsTable;
