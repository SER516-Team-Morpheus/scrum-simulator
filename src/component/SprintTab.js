import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

function SprintTab() {
  const [sprintName, setSprintName] = useState('');
  const [sprintGoal, setSprintGoal] = useState('');
  const [sprintStartDate, setSprintStartDate] = useState('');
  const [sprintEndDate, setSprintEndDate] = useState('');
  const [sprintData, setSprintData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSprintNameChange = (event) => {
    setSprintName(event.target.value);
  };

  const handleSprintGoalChange = (event) => {
    setSprintGoal(event.target.value);
  };

  const handleSprintStartDateChange = (event) => {
    setSprintStartDate(event.target.value);
  };

  const handleSprintEndDateChange = (event) => {
    setSprintEndDate(event.target.value);
  };

  const handleCreateSprint = () => {
    const data = {
      name: sprintName,
      goal: sprintGoal,
      startDate: sprintStartDate,
      endDate: sprintEndDate,
    };
    console.log(data);
    setSprintData([data]);
  };

  return (
    <div style={{padding: '3%'}}>
      <div> 
        <h1 style={{color: "#8C1D40"}}>Create Sprint</h1>
      </div>
      <div style={{textAlign: 'right'}}>
      <Button variant="contained" color="primary" onClick={handleOpen}>Create Sprint</Button>
      </div>
      <div>
        {
          sprintData.map(data=>{
            return <div> 
              <h3 style={{color: "#8C1D40"}} >Sprint Created!</h3>
              <p>Sprint Name: {data.name}</p>
              <p>Sprint Goal: {data.goal}</p>
              <p>Sprint Start Date: {data.startDate}</p>
              <p>Sprint End Date: {data.endDate}</p>
            </div> 
          })
        }
      </div>

    
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Sprint</DialogTitle>
      <DialogContent>
        <div>
          <TextField
          id="sprintName"
          label="Sprint Name"
          variant="outlined"
          margin="normal"
          value={sprintName}
          onChange={handleSprintNameChange}
          fullWidth
          />
        </div>
        <div>
          <TextField
          id="sprintGoal"
          label="Sprint Goal"
          variant="outlined"
          margin="normal"
          value={sprintGoal}
          onChange={handleSprintGoalChange}
          fullWidth
          />
        </div>
        <div>
          <TextField
          id="sprintStartDate"
          label="Sprint Start Date"
          variant="outlined"
          margin="normal"
          type="date"
          value={sprintStartDate}
          onChange={handleSprintStartDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          />
        </div>
        <div>
          <TextField
          id="sprintEndDate"
          label="Sprint End Date"
          variant="outlined"
          margin="normal"
          type="date"
          value={sprintEndDate}
          onChange={handleSprintEndDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          />
        </div>
        <button onClick={handleCreateSprint} style={{ float: "left" }}>Create Sprint</button>
      <div/>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SprintTab;
