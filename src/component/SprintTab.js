import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import axios from 'axios';

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
    axios.post('http://localhost:3010/createSprint', {
      username: Cookies.get('username'),
      password: Cookies.get('password'),
      sprint: {
        estimated_start: sprintStartDate,
        estimated_finish: sprintEndDate,
        name: sprintName,
        project: Cookies.get('projectId')

      }
    })
      .then(res => {
        const data = {
          name: sprintName,
          startDate: sprintStartDate,
          endDate: sprintEndDate,
        };
        setOpen(false);
        setSprintData(prevState => [...prevState, data])
      })
  };

  const [sName,setSName]=useState('');

  const handleStoryName = (event)=>{
    setSName(event.target.value);
  }

  // const moveStory=()=>{
  //   axios.post('http://localhost:3003/moveUserStory',{

  //   })
  //   .then(res=>{

  //   })
  //   {
  //     "username": "SERtestuser",
  //     "password": "testuser",
  //     "projectId": 733810,
  //     "sprintId": 347607,
  //     "userStoryID": [
  //         4524779
  //     ]
  // }
  // }

  useEffect(() => {
    axios.post('http://localhost:3010/sprints', {
      username: Cookies.get('username'),
      password: Cookies.get('password'),
      projectID: Cookies.get('projectId')
    })
      .then(res => {
        console.log(res.data)
        setSprintData(res.data.sprints)
      })
  }, [])

  return (
    <Wrapper>
      <div className='heading-bar'>
        <Typography className="heading" variant="h3" gutterBottom>
          Sprints
        </Typography>
        <div>
          <Button className="create-btn" variant="contained" onClick={handleOpen}>Create Sprint</Button>
        </div>
      </div>
      <div>
        {
          sprintData.map((data, index) => {
            return (
              <div key={index}>
                <p>Sprint Name: {data.name}</p>
                <p>Sprint Start Date: {data.estimated_start}</p>
                <p>Sprint End Date: {data.estimated_finish}</p>
                {/* <TextField
                  id="sprintName"
                  label="Sprint Name"
                  variant="outlined"
                  margin="normal"
                  value={sName}
                  onChange={handleStoryName}
                  fullWidth
                /> */}
                {/* <button onClick={()=>}>Add story to sprint</button> */}
                <hr />
              </div>

            );
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
          <div />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

export default SprintTab;
