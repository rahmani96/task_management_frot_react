import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosConfig from '../../axiosConfig';
import {useRef} from 'react';
import { Toast } from 'primereact/toast';
import {useNavigate} from 'react-router-dom';

export default function SignUp() {
    let navigate = useNavigate();
    const toast = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({name:data.get('name'), email: data.get('email'),password: data.get('password')});
        register(data.get('name'), data.get('email'), data.get('password'));
    };

    const register = async (name, email, password) => {
        const axios1 = axiosConfig()
        try {
            await axios1.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios1.post('http://localhost:8000/api/register', { name, email, password });
            console.log("retter: ", response.data);
            if (response.data.success) {
                navigate('/login')
            } else {
                console.error('Register failed:', response.data.message);
                toast.current.show({ severity: 'error', summary: 'Register failed', detail: "Try again!" });
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.current.show({ severity: 'error', summary: 'Register failed', detail: "An error occurred!" });
        }
    };

    return (
        <>
            <Toast ref={toast} position="top-center"/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"> Sign up </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField autoComplete="given-name" name="name" required fullWidth id="name" label="Name" autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign Up</Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2"> Already have an account? Sign in</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}