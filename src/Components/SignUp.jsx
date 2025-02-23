import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, signUpUser } from '../store/slices/SignUpSlice';
import { Container, Grid, Paper, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const roles = ['User', 'admin'];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formData = useSelector((state) => state.signupReducer);
    console.log('Redux States --> ', formData);

    const [data, setData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        roles: '', // Changed from [] to ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleChange = (event) => {
        setData((prev) => ({ ...prev, roles: event.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        dispatch(signUpUser(data));

        setData({
            name: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            city: '',
            roles: '', // Reset roles to empty string
        });

        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: '15px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}
                >
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                type="number"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    name="roles"
                                    value={data.roles}
                                    onChange={handleRoleChange}
                                    label="Role"
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, padding: 1.5, fontSize: '16px' }}
                    >
                        Submit
                    </Button>
                </form>
                <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'end' }}>
                    <Button onClick={() => navigate('/login')}>Already have an account?</Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;
