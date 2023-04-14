import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const Wrapper = styled.div`

.heading-bar {
    display:flex;
    justify-content: space-between;
    margin-top:20px
}
.heading{
    // margin-top: 10px;
    color: #8C1D40;
}

.create-btn {
    margin-top:10%;
    background-color: #8C1D40;
}

img {
    height:300px;
    width: 500px;
    opacity:0.1;
    margin: 100px 200px;
    position:absolute;
}

.project-list {
    margin-top:30px;
    cursor:pointer;
    a {
        text-decoration:none;
    }        
}

.loader {
    position: relative;
    top:50%;
    left:30%;
}
`;

function SprintTab() {

  const [sprintName, setSprintName] = useState('');
  const [sprintGoal, setSprintGoal] = useState('');
  const [sprintStartDate, setSprintStartDate] = useState('');
  const [sprintEndDate, setSprintEndDate] = useState('');
  const [sprintData, setSprintData] = useState(null);
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
    setSprintData(data);
  };

  return (
    <Wrapper>
      <div className='heading-bar'>
        <Typography className="heading" variant="h3" gutterBottom>
          Sprint
        </Typography>
        <div>
          <Button className="create-btn" variant="contained" onClick={handleOpen}>New Sprint</Button>
        </div>
      </div>     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Sprint</DialogTitle>
        <DialogContent>
          <div>
            <label htmlFor="sprintName" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }}>Sprint Name:</label>
            <input type="text" id="sprintName" name="sprintName" value={sprintName} onChange={handleSprintNameChange} />
          </div>

          <div>
            <label htmlFor="sprintGoal" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }}>Sprint Goal:</label>
            <input type="text" id="sprintGoal" name="sprintGoal" value={sprintGoal} onChange={handleSprintGoalChange} />
          </div>

          <div>
            <label htmlFor="sprintStartDate" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }} >Sprint Start Date:</label>
            <input type="date" id="sprintStartDate" name="sprintStartDate" value={sprintStartDate} onChange={handleSprintStartDateChange} />
          </div>

          <div>
            <label htmlFor="sprintEndDate" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }}>Sprint End Date:</label>
            <input type="date" id="sprintEndDate" name="sprintEndDate" value={sprintEndDate} onChange={handleSprintEndDateChange} />
          </div>

          <button onClick={handleCreateSprint} style={{ float: "left" }}>Create Sprint</button>
        <div/>

        {sprintData && (
          <div>
          <h3 style={{textAlign: "center", color: "#8C1D40"}}>Sprint Created! </h3>
          <p>Name: {sprintData.name}</p>
          <p>Goal: {sprintData.goal}</p>
          <p>Start Date: {sprintData.startDate}</p>
          <p>End Date: {sprintData.endDate}</p>
        </div>
        )}
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
    </Wrapper>
  );
}

export default SprintTab;
