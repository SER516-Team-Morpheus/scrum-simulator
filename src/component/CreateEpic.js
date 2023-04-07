import React, { useState } from 'react';
import { Button, MenuItem, TextField, Typography } from '@material-ui/core';
import '../css/CreateEpic.css';



const CreateEpic = ({ addEpic }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('New');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleSubmit = (e) => {
    e.preventDefault();
    addEpic({ name, status, description, tasks });
    setName('');
    setStatus('New');
    setDescription('');
    setTasks([]);
    };

    const handleAddTask = (task) => {
    setTasks([...tasks, task]);
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
    <form onSubmit={handleSubmit}>
        <Typography variant="h6">Create Epic</Typography>
        <TextField
        label="Epic Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        />
        <TextField
        select
        label="Epic Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
        >
        <MenuItem value="New">New</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <TextField
        label="Epic Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        />
        <Typography variant="h6">Tasks</Typography>
        {tasks.map((task, index) => (
        <TaskInput
            key={index}
            index={index}
            task={task}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
        />
        ))}
        <TaskInput onAdd={handleAddTask} />
        <Button type="submit" variant="contained" color="primary">
        Create Epic
        </Button>
    </form>
    );
};


const TaskInput = ({ index, task, onUpdate, onDelete, onAdd }) => {
    const [name, setName] = useState(task ? task.name : '');
    const [user, setUser] = useState(task ? task.user : '');
    const [dueDate, setDueDate] = useState(task ? task.dueDate : '');

    const handleNameChange = (e) => {
    setName(e.target.value);
    onUpdate(index, { ...task, name: e.target.value });
};

    const handleUserChange = (e) => {
    setUser(e.target.value);
    onUpdate(index, { ...task, user: e.target.value });
    };

    const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    onUpdate(index, { ...task, dueDate: e.target.value });
    };

    const handleDeleteClick = () => {
        onDelete(index);
        };
        
    return (
        
        <div>
            <TextField
                label="Task Name"
                value={name}
                onChange={handleNameChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Assign User"
                value={user}
                onChange={handleUserChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            {onDelete && (
                <Button onClick={handleDeleteClick} color="secondary">
                Delete
                </Button>
            )}
            {onAdd && (
                <Button onClick={() => onAdd({ name: '', user: '', dueDate: '' })}>
                Add Task
                </Button>
            )}
        </div>
    );
};
            
export default CreateEpic;