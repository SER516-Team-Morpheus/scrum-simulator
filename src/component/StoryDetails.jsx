import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';

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
    justify-content:space-between
    // margin-bottom: 20px;
}
.item-right {
    display:flex;
    justify-content: space-evenly;
}
.item-left {
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
    p {
        margin:0px;
        padding: 0px;
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


`;

const StoryDetails = () => {

    const { name } = useParams();
    const [taskState, setTaskState] = useState('New');
    const [storyPoints, setStoryPoints] = useState('3');
    const [showDialog, setShowDialog] = useState(false);
    const handleChange = (event) => {
        setTaskState(event.target.value)
    }
    const handleStoryPoints = (event) => {
        setStoryPoints(event.target.value);
    }
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
                        value={storyPoints}
                        label="Points"
                        onChange={handleStoryPoints}
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
                        value={storyPoints}
                        label="Points"
                        onChange={handleStoryPoints}
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
                        value={storyPoints}
                        label="Points"
                        onChange={handleStoryPoints}
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
                        value={storyPoints}
                        label="Points"
                        onChange={handleStoryPoints}
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

            </StoryInfo>
            <TaskList>
                <div className='task-heading'>
                    <h3>Tasks</h3>
                    <div className='task-item'>
                        <div className='item-left'>
                            <h4>Create Sprint button</h4>
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
                                <p>Unique Chhetri</p>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div className='task-item'>
                        <div className='item-left'>
                            <h4>Create Sprint button</h4>
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
                                <p>Unique Chhetri</p>
                            </div>
                        </div>

                    </div>
                </div>
            </TaskList>

        </Wrapper>
    )
}

export default StoryDetails;