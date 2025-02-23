import { Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/slices/LoginSlice'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Container, FormControl } from '@mui/material';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roles = ['User', 'admin'];
    const [data, setData] = useState({
        email: '',
        password: '',
        roles: '', // Fixed: Changed from [] to ''
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
        dispatch(loginUser(data, navigate));
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
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
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, padding: 1.5, fontSize: '16px' }}
                    >
                        Login
                    </Button>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => navigate('/')} color="primary">
                            Sign Up?
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
