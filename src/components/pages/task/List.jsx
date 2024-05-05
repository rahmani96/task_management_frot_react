import React, { useEffect, useRef, useState } from 'react'
import axiosConfig from '../../../axiosConfig';
import { Container, CssBaseline, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Toast } from 'primereact/toast';
import ListTaskItem from './ListItem'
import {useNavigate} from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import echo from '../../../Echo';

const List = () => {
    const [tasks, setTasks] = useState([]);
    const toast = useRef(null);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllTasks()
        console.log('Subscribing to shared-task-channel...');
        const channel = echo.channel('shared-task-channel');
        channel.listen('SharedTask', (e) => {
                setTasks(...tasks, e.task)
            });
    }, []);
    
    
    const getAllTasks = async () => {
        const axios1 = axiosConfig()
        try {
            await axios1.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios1.get('http://localhost:8000/api/v1/tasks');
            if (response.data.success) {
                console.log('resp: ', response.data);
                setTasks(response.data.data)
                setLoading(false)
            } else {
                console.error('get tasks failed:', response.data.message);
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
                <Container component="main" maxWidth="md" sx={{ backgroundColor: '#f0f2f5', paddingTop: 3, marginTop: 10, paddingBottom: 8, borderRadius: 16, overflowY: 'auto' }}>
                    <CssBaseline />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        {
                            localStorage.getItem('permissions').includes('add_tasks') &&
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, width: '100%' }}>
                                <IconButton aria-label="add" size="small" sx={{ color: 'green'}} onClick={() => navigate('/tasks/add')}>
                                    <AddIcon /> New
                                </IconButton>
                            </Box>
                        }
                        <Typography component="h1" variant="h4" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 3}}>
                            Task Management
                        </Typography>
                        <Box sx={{ width: '100%', backgroundColor: '#ffffff', padding: 4, borderRadius: 8 }}>
                            {tasks.map((task) => (
                                <ListTaskItem
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                />
                                ))}
                        </Box>
                    </Box>
                    <Toast ref={toast} position="top-center"/>
                </Container>
                </>
            )}
        </Box>
    );
}

export default List