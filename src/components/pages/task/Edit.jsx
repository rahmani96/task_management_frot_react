import React, { useEffect, useRef, useState } from 'react'
import { Typography, Container, CssBaseline, Box, TextField, Button } from '@mui/material';
import { useNavigate, useParams} from 'react-router-dom';
import axiosConfig from '../../../axiosConfig';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

const Edit = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [task, setTask] = useState("");
    const toast = useRef(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTask()
    }, []);

    const getTask = async () => {
        const axios1 = axiosConfig()
        try {
            await axios1.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios1.get(`http://localhost:8000/api/v1/tasks/${id}`);
            if (response.data.success) {
                setTask(response.data.data)
                setTitle(response.data.data.title)
                setDescription(response.data.data.description)
                setLoading(false)
            } else {
                console.error('get task failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        const axios1 = axiosConfig()
        try {
            await axios1.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios1.put(`http://localhost:8000/api/v1/tasks/${task.id}`, {title, description});
            if (response.data.success) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
                navigate('/dashboard')
            } else {
                console.error('update failed:', response.data.message);
                toast.current.show({ severity: 'error', summary: 'Failed', detail: 'Updated task failed' });
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
            {loading ? ( 
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8"/>
            ) : ( 
                <>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                        <Box sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}></Box>
                    <Typography component="h1" variant="h5" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        Update Task
                    </Typography>
                    <Box component="form" onSubmit={handleEdit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="title" label="Title" name="title"
                            autoComplete="title" autoFocus value={title} onChange={handleTitleChange}/>
                        <TextField margin="normal" required fullWidth name="description" label="description"
                            id="description" autoComplete="description" value={description} onChange={handleDescriptionChange}/>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Update </Button>
                    </Box>
                </Container>
                <Toast ref={toast} position="top-center"/>
                </>
            )}
        </Box>
    );
}

export default Edit