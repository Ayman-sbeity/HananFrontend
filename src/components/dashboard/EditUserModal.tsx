import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { updateUser, getUserById } from "../../services/api";
import type { User } from "../../services/api";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  userId: string | null;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  onUserUpdated,
  userId,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId && open) {
        setFetchingUser(true);
        try {
          const userData = await getUserById(userId);
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            password: "",
            role: userData.role || "user",
          });
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setFetchingUser(false);
        }
      }
    };

    fetchUser();
  }, [userId, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) return;

    setLoading(true);
    try {
      const updateData: Partial<User> = {};
      if (formData.name) updateData.name = formData.name;
      if (formData.email) updateData.email = formData.email;
      if (formData.password) updateData.password = formData.password;
      if (formData.role) updateData.role = formData.role;

      await updateUser(userId, updateData);
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      {fetchingUser ? (
        <DialogContent
          sx={{ display: "flex", justifyContent: "center", padding: 4 }}
        >
          <CircularProgress />
        </DialogContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="password"
              label="New Password (leave blank to keep current)"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
                label="Role"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default EditUserModal;
