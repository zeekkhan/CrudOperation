import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper,
  TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

const App = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch all users from the server

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setUsers(response.data);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  // Open dialog for adding/editing user
  const handleClickOpen = () => {
    setName('');
    setEmail('');
    setEditId(null);
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  
  };

  // Save a new user or update an existing user
  const handleSave = async () => {
  
    if (editId) {

      // Update existing user
      
      try {
        await axios.put(`http://localhost:5000/api/items/${editId}`, { name, email });
        fetchUsers();
      } catch (error) {
      
        console.error('Error updating user:', error);
      }
    } else {
      // Create new user
      try {
        await axios.post('http://localhost:5000/api/items', { name, email });
        fetchUsers();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
    handleClose();
  };

  // Edit user
  const handleEdit = (user) => {
  
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
    setOpen(true);
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);

    }
  };

  return (

    <Container maxWidth="md">
    
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          User Management System
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add User
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginRight: '8px' }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(user.id)}
                    >

                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for adding/editing user */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editId ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default App;
