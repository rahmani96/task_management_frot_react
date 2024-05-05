import {useNavigate} from 'react-router-dom';
import axiosConfig from '../../../axiosConfig';
import * as React from 'react';
import { Typography, CssBaseline, Container, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

function Form() {
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        const axios1 = axiosConfig()
        try {
            await axios1.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios1.post('http://localhost:8000/api/v1/tasks', { title, description });
            if (response.data.success) {
                navigate('/dashboard')
                console.log('Add task successful');
            } else {
                console.error('add failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh',
        }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <Box sx={{
                        marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}></Box>
                <Typography component="h1" variant="h5" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    Add New Task
                </Typography>
                <Box component="form" onSubmit={handleAdd} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="title" label="Title" name="title"
                        autoComplete="title" autoFocus value={title} onChange={handleTitleChange}/>
                    <TextField margin="normal" required fullWidth name="description" label="description"
                        id="description" autoComplete="description" value={description} onChange={handleDescriptionChange}/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Add </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Form