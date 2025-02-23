import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const Booking = () => {
    const [bookingDetails, setBookingDetails] = useState({
        checkInDate: '',
        checkOutDate: '',
        roomType: '',
        guests: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Booking Details:', bookingDetails);
        // Add booking logic here
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>Book a Room</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Check-In Date"
                                type="date"
                                name="checkInDate"
                                InputLabelProps={{ shrink: true }}
                                value={bookingDetails.checkInDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Check-Out Date"
                                type="date"
                                name="checkOutDate"
                                InputLabelProps={{ shrink: true }}
                                value={bookingDetails.checkOutDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Room Type"
                                name="roomType"
                                value={bookingDetails.roomType}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Number of Guests"
                                type="number"
                                name="guests"
                                value={bookingDetails.guests}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">Book Now</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Booking;