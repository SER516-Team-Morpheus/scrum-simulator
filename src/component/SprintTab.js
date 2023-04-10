//import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
//import React, { useState } from 'react';
//
//function SprintTab() {
//  const [sprintName, setSprintName] = useState('');
//  const [sprintGoal, setSprintGoal] = useState('');
//  const [sprintStartDate, setSprintStartDate] = useState('');
//  const [sprintEndDate, setSprintEndDate] = useState('');
//  const [sprintData, setSprintData] = useState(null);
//
//  const handleSprintNameChange = (event) => {
//    setSprintName(event.target.value);
//  };
//
//  const handleSprintGoalChange = (event) => {
//    setSprintGoal(event.target.value);
//  };
//
//  const handleSprintStartDateChange = (event) => {
//    setSprintStartDate(event.target.value);
//  };
//
//  const handleSprintEndDateChange = (event) => {
//    setSprintEndDate(event.target.value);
//  };
//
//  const handleCreateSprint = () => {
//    const data = {
//      name: sprintName,
//      goal: sprintGoal,
//      startDate: sprintStartDate,
//      endDate: sprintEndDate,
//    };
//    console.log(data);
//    setSprintData(data);
//  };
//
//  return (
//    <div>
//      <div>
//        <h1 style={{color: "#8C1D40"}}>Create Sprint</h1>
//
//        <div>
//          <label htmlFor="sprintName" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }}>Sprint Name:</label>
//          <input type="text" id="sprintName" name="sprintName" value={sprintName} onChange={handleSprintNameChange} />
//        </div>
//
//        <div>
//          <label htmlFor="sprintGoal" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }}>Sprint Goal:</label>
//          <input type="text" id="sprintGoal" name="sprintGoal" value={sprintGoal} onChange={handleSprintGoalChange} />
//        </div>
//
//        <div>
//          <label htmlFor="sprintStartDate" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }} >Sprint Start Date:</label>
//          <input type="date" id="sprintStartDate" name="sprintStartDate" value={sprintStartDate} onChange={handleSprintStartDateChange} />
//        </div>
//
//        <div>
//          <label htmlFor="sprintEndDate" style={{ marginRight: "1em", fontSize: "1.2em", color: "blue" }}>Sprint End Date:</label>
//          <input type="date" id="sprintEndDate" name="sprintEndDate" value={sprintEndDate} onChange={handleSprintEndDateChange} />
//        </div>
//
//        <button onClick={handleCreateSprint} style={{ float: "left" }}>Create Sprint</button>
//      </div>
//
//      {sprintData && (
//        <div>
//        <h3 style={{textAlign: "center", color: "#8C1D40"}}>Sprint Created! </h3>
//        <p>Name: {sprintData.name}</p>
//        <p>Goal: {sprintData.goal}</p>
//        <p>Start Date: {sprintData.startDate}</p>
//        <p>End Date: {sprintData.endDate}</p>
//      </div>
//      )}
//    </div>
//  );
//}
//
//export default SprintTab;
//

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

function SprintTab() {
  const [sprintName, setSprintName] = useState('');
  const [sprintGoal, setSprintGoal] = useState('');
  const [sprintStartDate, setSprintStartDate] = useState('');
  const [sprintEndDate, setSprintEndDate] = useState('');
  const [sprintData, setSprintData] = useState(null);
  const [open, setOpen] = useState(false);

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1 style={{color: "#8C1D40"}}>Create Sprint</h1>

      <TextField
        id="sprintName"
        label="Sprint Name"
        variant="outlined"
        margin="normal"
        value={sprintName}
        onChange={handleSprintNameChange}
        fullWidth
      />

      <TextField
        id="sprintGoal"
        label="Sprint Goal"
        variant="outlined"
        margin="normal"
        value={sprintGoal}
        onChange={handleSprintGoalChange}
        fullWidth
      />

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

      <Button variant="contained" color="primary" onClick={handleCreateSprint} style={{marginTop: "1em"}}>
        Create Sprint
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sprint Created!</DialogTitle>
        <DialogContent>
          <p>Name: {sprintData?.name}</p>
          <p>Goal: {sprintData?.goal}</p>
          <p>Start Date: {sprintData?.startDate}</p>
          <p>End Date: {sprintData?.endDate}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SprintTab;
