import React, { useState, useEffect } from 'react';
import { Button, Collapse, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import { green, red, yellow } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import '../css/CreateEpic.css';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
    },
    input: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    task: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: theme.spacing(1),
    },
    addButton: {
        marginTop: theme.spacing(1),
    },
    submitButton: {
        marginTop: theme.spacing(4),
        backgroundColor: green[500],
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    deleteButton: {
        color: red[500],
        marginLeft: theme.spacing(1),
    },
    alert: {
        marginTop: theme.spacing(2),
    },
    statusNew: {
        color: red[500],
    },
    statusInProgress: {
        color: yellow[500],
    },
    statusCompleted: {
        color: green[500],
    },
}));

const CreateEpic = ({ addEpic }) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [status, setStatus] = useState('New');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [epics, setEpics] = useState([]);

    useEffect(() => {

        const fetchEpics = async () => {

            const response = await axios.post('http://localhost:3006/listEpics', {
                username: 'SERtestuser',
                password: 'testuser',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNDM0NjQwLCJqdGkiOiJhYzkyMDBjMDEyYTM0ZGQ1ODQ0NjMzY2MyYjNjNmQ1YyIsInVzZXJfaWQiOjU1OTIxNX0._W4lEK9zTQQK1Jl01Sg9I2Xw75skJm6sTQiV92FuMBQ',
                projectId: 733810,
            });
            setEpics(response.data.epics);
        };

        fetchEpics();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === '') {

            setOpen(true);
            return;
        }
        const epicData = {
            username: 'SERtestuser',
            password: 'testuser',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNDM0NjQwLCJqdGkiOiJhYzkyMDBjMDEyYTM0ZGQ1ODQ0NjMzY2MyYjNjNmQ1YyIsInVzZXJfaWQiOjU1OTIxNX0._W4lEK9zTQQK1Jl01Sg9I2Xw75skJm6sTQiV92FuMBQ',
            name,
            description,
            projectId: 733810,
        };
        try {
            
            const createEpicResponse = await axios.post('http://localhost:3006/createEpic', epicData);
            const createdEpic = createEpicResponse.data;
            const epicInfo ={
                subject:createdEpic.epicName,
                status:createdEpic.epicId,
                description:createdEpic.description
            }
            addEpic(createdEpic);
            setEpics([...epics, epicInfo]);
            setName('');
            setStatus('New');
            setDescription('');
            setTasks([]);

        //     const listEpicsResponse = await axios.post('http://localhost:3006/listEpics', {
        //         username: 'SERtestuser',
        //         password: 'testuser',
        //         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNDM0NjQwLCJqdGkiOiJhYzkyMDBjMDEyYTM0ZGQ1ODQ0NjMzY2MyYjNjNmQ1YyIsInVzZXJfaWQiOjU1OTIxNX0._W4lEK9zTQQK1Jl01Sg9I2Xw75skJm6sTQiV92FuMBQ',
        //         projectId: 733810,
        //     });
        //     setEpics(listEpicsResponse.data);
        //     setName('');
        //     setStatus('New');
        //     setDescription('');
        //     setTasks([]);
        } catch (error) {
            console.error(error);
        }
    };


    const handleAddTask = () => {
        setTasks([...tasks, { name: '', user: '', dueDate: '' }]);
    };

    const handleTaskUpdate = (index, updatedTask) => {
        setTasks([
            ...tasks.slice(0, index),
            updatedTask,
            ...tasks.slice(index + 1),
        ]);
    };

    const handleTaskDelete = (index) => {
        setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Typography variant="h6">Create Epic</Typography>
            <TextField label="Epic Name" value={name} onChange={(e) => setName(e.target.value)} className={classes.input} />
            <TextField select label="Epic Status" value={status} onChange={(e) => setStatus(e.target.value)} className={classes.input}>
                <MenuItem value="New" style={{ color: red[500] }}>New</MenuItem>
                <MenuItem value="In Progress" style={{ color: yellow[500] }}>In Progress</MenuItem>
                <MenuItem value="Completed" style={{ color: green[500] }}>Completed</MenuItem>
            </TextField>
            <TextField
                label="Epic Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                className={classes.input}
            />
            <div>
                {epics.map(epic => (
                    <div key = {epic.id}>
                        <Typography>{epic.subject}</Typography>
                        <Typography>{epic.status}</Typography>
                        <Typography>{epic.description}</Typography>
                    </div>
                ))}
            </div>

        
            {tasks.map((task, index) => (
                <Collapse in={true} key={index}>
                    <div className={classes.task}>
                        <TextField
                            label="Task Name"
                            value={task.name}
                            onChange={(e) => handleTaskUpdate(index, { ...task, name: e.target.value })}
                            className={classes.input}
                        />
                        <TextField
                            label="Assigned User"
                            value={task.user}
                            onChange={(e) => handleTaskUpdate(index, { ...task, user: e.target.value })}
                            className={classes.input}
                        />
                        <TextField
                            type="date"
                            label="Due Date"
                            value={task.dueDate}
                            onChange={(e) => handleTaskUpdate(index, { ...task, dueDate: e.target.value })}
                            className={classes.input}
                        />
                        <Button
                            onClick={() => handleTaskDelete(index)}
                            className={classes.deleteButton}
                        >
                            Delete
                        </Button>
                    </div>
                </Collapse>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddTask}
                className={classes.addButton}
            >
                Add Task
            </Button>
            <Button
                type="submit"
                variant="contained"
                className={classes.submitButton}
            >
                Create Epic
            </Button>
            <Collapse in={open}>
                <Alert severity="error" className={classes.alert}>Please enter a valid epic name.</Alert>
            </Collapse>
        </form>
    );
};

export default CreateEpic;

