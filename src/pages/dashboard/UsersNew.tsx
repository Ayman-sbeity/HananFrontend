import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import AddUserModal from "../../components/dashboard/AddUserModal";

const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2024-01-15",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-12-10",
    avatar: "JS",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Customer",
    status: "Inactive",
    joinDate: "2024-02-20",
    avatar: "MJ",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Moderator",
    status: "Active",
    joinDate: "2024-01-05",
    avatar: "SW",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2024-03-01",
    avatar: "DB",
  },
];

const Users: React.FC = () => {
  const [users] = useState<any[]>(sampleUsers);
  const [modalOpen, setModalOpen] = useState(false);

  const handleUserAdded = () => {
    console.log("User added");
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "success" : "default";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "error";
      case "Moderator":
        return "warning";
      case "Customer":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Users Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add New User
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {user.avatar}
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button size="small" variant="outlined" color="primary">
                        Edit
                      </Button>
                      <Button size="small" variant="outlined" color="error">
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {users.length} users
        </Typography>
      </Box>

      <AddUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </Box>
  );
};

export default Users;
