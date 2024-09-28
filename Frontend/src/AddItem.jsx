// src/AddItem.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const AddItem = ({ onItemAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/items', { name, email });
        setName('');
        setEmail('');
        onItemAdded(); // Refresh the item list
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add New Item</Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Add Item
            </Button>
        </form>
    );
};

export default AddItem;
