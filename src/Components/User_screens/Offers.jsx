import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const offers = [
    { id: 1, title: 'Weekend Getaway', description: 'Enjoy a 20% discount on weekend stays.' },
    { id: 2, title: 'Family Package', description: 'Book a family room and get free breakfast.' },
    { id: 3, title: 'Long Stay Discount', description: 'Stay for 7 nights and get 1 night free.' }
];

const Offers = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Special Offers</Typography>
            <Grid container spacing={3}>
                {offers.map(offer => (
                    <Grid item xs={12} sm={6} md={4} key={offer.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{offer.title}</Typography>
                                <Typography>{offer.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Offers;