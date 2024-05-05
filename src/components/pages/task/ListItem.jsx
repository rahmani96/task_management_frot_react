import React, { useRef, useState } from 'react'
import axiosConfig from '../../../axiosConfig';
import { Typography, Paper, CardContent, CardActions, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import {useNavigate} from 'react-router-dom';


const ListTaskItem = (props) => {
    const [visible, setVisible] = useState(false)
    const toast = useRef(null);
    let navigate = useNavigate();

    const handleDelete = async (taskId) => {
        const axios1 = axiosConfig()
        try {
            await axios1.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios1.delete(`http://localhost:8000/api/v1/tasks/${taskId}`);
            if (response.data.success) {
                console.log('resp: ', response.data);
                console.log('Task deleted successfully');
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Task deleted successfully' });
            } else {
                console.error('Delete task failed:', response.data.message);
                toast.current.show({ severity: 'error', summary: 'Failed', detail: 'Delete task failed' });
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const navigateToEdit = (id) => {
        if(localStorage.getItem('permissions').includes('edit_tasks')){
            navigate(`/tasks/edit/${id}`)
        } else {
            toast.current.show({ severity: 'error', summary: 'Rejected', detail: "You don't have permissions" });
        }
    }

    const reject = () => {
        toast.current.show({ severity: 'error', summary: 'Rejected', detail: 'Action canceled' });
    };

    return (
        <>
        <Paper elevation={3} sx={{ marginBottom: 2, borderRadius: 8, backgroundColor: '#f8f9fa' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div"> {props.title} </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}> {props.description} </Typography>
            </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
                {
                    localStorage.getItem('permissions').includes('edit_tasks') &&
                    <IconButton aria-label="edit" size="small" sx={{ color: '#1976d2', marginRight: 1 }} 
                        onClick={() => navigateToEdit(props.id)}>
                        <EditIcon />
                    </IconButton>
                }
                {
                    localStorage.getItem('permissions').includes('delete_tasks') &&
                    <>
                    <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} 
                        message={`Are you sure you want to delete task "${props.title}"?`}
                        header="Confirmation" icon="pi pi-exclamation-triangle" accept={() => handleDelete(props.id)} reject={() => reject()} />
                    <IconButton aria-label="delete" size="small" sx={{ color: '#f44336' }} onClick={() => setVisible(true)}>
                        <DeleteIcon />
                    </IconButton>
                    </>
                }
                </CardActions>
        </Paper>
        <Toast ref={toast} position="top-center"/>
        </>
    );
}

export default ListTaskItem