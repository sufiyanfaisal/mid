import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { db } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreatePackage = () => {
    const [formData, setFormData] = useState({
        packageDuration: '',
        packageName: '',
        mealIncluded: '',
        airConditioner: '',
    });

    // Example dropdown options
    const durationOptions = ['1 Day', '3 Days', '1 Week', '1 Month'];
    const mealOptions = ['Yes', 'No'];
    const airConditionerOptions = ['Yes', 'No'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save the form data into a new document in the "packages" collection
            const docRef = await addDoc(collection(db, "packages"), formData);
            console.log("Package created with ID: ", docRef.id);
            alert("Package created successfully!");
            // Clear form after successful submission
            setFormData({
                packageDuration: '',
                packageName: '',
                mealIncluded: '',
                airConditioner: '',
            });
        } catch (error) {
            console.error("Error creating package: ", error);
            alert("Error creating package: " + error.message);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Create Package
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Package Duration Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="package-duration-label">Package Duration</InputLabel>
                    <Select
                        labelId="package-duration-label"
                        name="packageDuration"
                        value={formData.packageDuration}
                        label="Package Duration"
                        onChange={handleChange}
                        required
                    >
                        {durationOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Package Name Text Field */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Package Name"
                    variant="filled"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    required
                />

                {/* Meal Included Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="meal-included-label">Meal Included</InputLabel>
                    <Select
                        labelId="meal-included-label"
                        name="mealIncluded"
                        value={formData.mealIncluded}
                        label="Meal Included"
                        onChange={handleChange}
                        required
                    >
                        {mealOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Air Conditioner Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="air-conditioner-label">Air Conditioner</InputLabel>
                    <Select
                        labelId="air-conditioner-label"
                        name="airConditioner"
                        value={formData.airConditioner}
                        label="Air Conditioner"
                        onChange={handleChange}
                        required
                    >
                        {airConditionerOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="success">
                    Create Package
                </Button>
            </form>
        </div>
    );
};

export default CreatePackage;