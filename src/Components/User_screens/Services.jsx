import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const services = [
    { id: 1, title: 'Spa', description: 'Relax with our luxurious spa treatments.' },
    { id: 2, title: 'Restaurant', description: 'Enjoy gourmet meals at our in-house restaurant.' },
    { id: 3, title: 'Pool', description: 'Take a dip in our heated swimming pool.' }
];

const Services = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Hotel Services</Typography>
            <Grid container spacing={3}>
                {services.map(service => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{service.title}</Typography>
                                <Typography>{service.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Services;