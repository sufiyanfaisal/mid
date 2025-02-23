import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { db } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateRoom = () => {
    const [formData, setFormData] = useState({
        category: '',
        size: '',
        floor: '',
        roomNumber: '',
    });

    // Example options for dropdowns
    const categoryOptions = ['Single', 'Double', 'Suite'];
    const sizeOptions = ['Small', 'Medium', 'Large'];
    const floorOptions = ['1st Floor', '2nd Floor', '3rd Floor'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save the form data into a new document in the "rooms" collection
            const docRef = await addDoc(collection(db, "rooms"), formData);
            console.log("Room created with ID: ", docRef.id);
            alert('Room created successfully!');
            // Clear form after successful submission
            setFormData({
                category: '',
                size: '',
                floor: '',
                roomNumber: '',
            });
        } catch (error) {
            console.error("Error creating room: ", error);
            alert("Error creating room: " + error.message);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Create Room
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Category Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        name="category"
                        value={formData.category}
                        label="Category"
                        onChange={handleChange}
                        required
                    >
                        {categoryOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Size Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="size-label">Size</InputLabel>
                    <Select
                        labelId="size-label"
                        name="size"
                        value={formData.size}
                        label="Size"
                        onChange={handleChange}
                        required
                    >
                        {sizeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Floor Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="floor-label">Floor</InputLabel>
                    <Select
                        labelId="floor-label"
                        name="floor"
                        value={formData.floor}
                        label="Floor"
                        onChange={handleChange}
                        required
                    >
                        {floorOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Room Number Text Field */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Room Number"
                    variant="filled"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                />

                <Button type="submit" variant="contained" color="primary">
                    Create Room
                </Button>
            </form>
        </div>
    );
};

export default CreateRoom;