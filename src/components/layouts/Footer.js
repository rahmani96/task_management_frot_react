import React from "react";
import { Typography, CssBaseline, Container, Box } from '@mui/material';

const Footer = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}></Box> 
            <Typography component="h1" variant="h5" style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <strong>Real Time Task Management</strong>  
                <div>&copy; 2024</div>
            </Typography>
        </Container>
    );
}

export default Footer