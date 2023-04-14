import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import { updateUserstory } from '../apis';
import { getStoryTask } from '../apis';
import { Cookie } from '@mui/icons-material';
import Cookies from 'js-cookie';

const Wrapper = styled.div`
margin-top:20px;
.heading {
    color: #8C1D40;
    opacity:1
}

`;
const TaskList = styled.div`

.task-heading {
    height: 40px;
    background-color: #f5c9d7;
    h3{
        padding:10px;
        color:white;
    }
}

.task-item {
    display:flex;
    justify-content:space-between;
    // margin-bottom: 20px;
}
.item-right {
    width:40%;
    display:flex;
    justify-content: space-evenly;
}
.item-left {
    width:40%
    h4 {
        margin:0px;
        padding: 5px;
    }
}

.assignee-select {
    width: 130px;
    height: 30px;
    margin-right:30px;
}
.assigned {
    width:20px;
    p {
        margin:0px;
        padding: 0px;
        text-align:center;
    }
}
hr {
    height: 0.5px;
    border: 0.5px solid;
    color: rgb(245, 201, 215);
    background-color: rgb(245, 201, 215);
    margin-top:20px;
    margin-bottom: 20px;
}

`;
const StoryInfo = styled.div`

display:flex;

justify-content: space-between;
background-color: rgb(245, 201, 215);
margin-bottom: 50px;
border-radius: 30px;
padding: 20px 20px 50px 20px;

.points-select {
    height: 30px;
    width:100px;
}
.assignee-select {
    height: 30px;
    width:250px;
}
.create-btn {
    margin-top:10%;
    background-color: #8C1D40;
}


`;

const StoryDetails = () => {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    let projectName = Cookies.get('projectName');
    let projectId = Cookies.get('projectId')
    const { name } = useParams();
    const [taskState, setTaskState] = useState('New');
    const [storyPoints, setStoryPoints] = useState('3');
    const [showDialog, setShowDialog] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [data, setData] = useState({
        username: Cookies.get('username'),
        password: Cookies.get('password'),
        projectname: Cookies.get('projectName'),
        userstoryname: name,
        storypoints: {
          UX: "0",
          Back: "0",
          Front: "0",
          Design: "0"
        }
      });
    const handleChange = (event) => {
        setTaskState(event.target.value)
    }
    const handleStoryPoints = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({
          ...prevState,
          storypoints: {
            ...prevState.storypoints,
            [name]: value
          }
        }))
      }
    const handleUpdateUserStory = (event) => {
        updateUserstory(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getStoryTask(username, password, projectName, name)
            .then(res => {
                setTaskList(res.data.details)
            })
    }, [])
    return (
        <Wrapper>
            {console.log(name, 'qparams')}
            <Typography className="heading" variant="h3" gutterBottom>
                {name}
            </Typography>
            <StoryInfo>
                <div className="info-left">
                    <h4>Story points</h4>
                    <InputLabel id="demo-simple-select-label-1">UX</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-1"
                        id="demo-simple-select"
                        className="points-select"
                        name="UX"
                        value={data.storypoints.UX}
                        label="Points"
                        onChange={handleStoryPoints}
                        defaultValue={"0"}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>

                    </Select>
                    <InputLabel id="demo-simple-select-label-2">Front</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-2"
                        id="demo-simple-select"
                        className="points-select"
                        value={data.storypoints.Front}
                        label="Points"
                        onChange={handleStoryPoints}
                        name="Front"
                        defaultValue={"0"}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>

                    </Select>
                    <InputLabel id="demo-simple-select-label-3">Back</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-3"
                        id="demo-simple-select"
                        className="points-select"
                        value={data.storypoints.Back}
                        label="Points"
                        name="Back"
                        onChange={handleStoryPoints}
                        defaultValue={"0"}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>

                    </Select>
                    <InputLabel id="demo-simple-select-label-4">Design</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="points-select"
                        value={data.storypoints.Design}
                        label="Points"
                        name="Design"
                        onChange={handleStoryPoints}
                        defaultValue={"0"}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>

                    </Select>
                </div>
                <div className="info-right">
                    <h4>Assignee</h4>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="assignee-select"
                        value={storyPoints}
                        label="Assignee"
                    // onChange={handleAssignee}
                    >
                        <MenuItem value={'1'}> Assignee 1</MenuItem>
                        <MenuItem value={'3'}>Assignee 2</MenuItem>

                    </Select>
                </div>
                <div>
                    <Button className="create-btn" variant="contained" onClick={handleUpdateUserStory}>Update</Button>
                </div>

            </StoryInfo>

            <TaskList>
                <div className='task-heading'>
                    <h3>Tasks</h3>
                    {
                        taskList.map((taskData, index) => {
                            return (
                                <>
                                    <div className='task-item'>
                                        <div className='item-left'>
                                            <h4>{index + 1 + ')' + ' '}{taskData.taskName ?? 'No task name'}</h4>
                                        </div>
                                        <div className='item-right'>
                                            <div className='item-drpdwn'>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className="assignee-select"
                                                    value={taskState}
                                                    label="Age"
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={'New'}>New</MenuItem>
                                                    <MenuItem value={'Working'}>Working</MenuItem>
                                                    <MenuItem value={'Testing'}>Testing</MenuItem>
                                                    <MenuItem value={'Done'}>Done</MenuItem>

                                                </Select>
                                            </div>
                                            <div className='assigned'>
                                                <p>{taskData.assigned_to_extra_info ? taskData.assigned_to_extra_info.full_name_display : 'No assignee'}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <hr />

                                </>
                            )
                        })
                    }

                </div>
            </TaskList>

        </Wrapper>
    )
}

export default StoryDetails;