import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateProject from './CreateProject';
import Link from '@mui/material/Link';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { autoPilot, getProject, getSprint, getStoryTask, moveTasks, updateTask } from '../apis';
import { ColorRing } from 'react-loader-spinner';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getUserStory } from '../apis/index';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SimulatorGame from './SimulatorGame';
import AutoSimulationDice from './AutoSimulationDice';
import axios from 'axios';

const Wrapper = styled.div`
margin-left:-30px;
.top-heading {
    display:flex;
    justify-content: space-between;
}
.simulator-game {
    height:50px;
    position: relative;
}
.heading {
    color: #8C1D40;
    margin-top:20px;
}

.top-bar {
    width: 100%;
    height:50px;
    background-color: #8C1D40;
    margin-bottom:30px;
}

.story-card {
    margin-bottom: 10px;
}

.arrow {
    margin-top:10px;
    display:flex;
    justify-content: space-between;
}

.btn-chart{
    margin-left:10px;
    margin-top:10px;
}

`;

const InfoCard = styled.div`

height: 300px;
width:600px;
padding:15px;
background-color: #f7f3f2;
border: 2px solid #8C1D40;
position:absolute;
z-index:100;
border-radius:20px;
top:25%;
left: 40%;

.loaders {
    height:30px;
    margin-left:50%;
}

.UserStory-form {
    padding:20px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;

    .heading {
        color: #8C1D40;
        margin-bottom: 40px;
    }

    .subject-field {
        margin-bottom: 20px;
    }
    .desc-field {
        margin-bottom: 40px;
    }
    .crt-btn {
        background-color:#8C1D40;
    }
    .cancel-btn {
        margin-top:20px;
        background-color:grey;
    }
}

`;


const AutoSimulation = () => {
    let email = Cookies.get('username') || 'SERtestuser';
    let password = Cookies.get('password') || 'testuser';
    let projectName = Cookies.get('projectName')
    let projectId = Cookies.get('projectId')
    const [storyList, setStoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState([]);
    const [inProgress, setInProgressTask] = useState([]);
    const [readyTest, setReadyTest] = useState([]);
    const [doneTask, setDoneTask] = useState([]);
    const [clickedStory, setClickedStory] = useState('');
    const [sprintDetails, setSprintDetails] = useState({});
    const [initalSimulation, setInitalSimulation] = useState([]);
    const [isSimulation, setIsSimulation] = useState(false);
    const navigate = useNavigate();
    const [idSprint, setIdSprint] = useState('');
    const [projectNewName, setProjectNewName] = useState('');
    const [isTaskLoader, setisTaskLoader] = useState(false);
    const [startSim, setStartSim] = useState(false);

    const getTaskList = () => {
        axios.get(`http://localhost:3015/getTasks?username=${email}&password=${password}&projectId=${Cookies.get('autoProjectId')}`)
            .then(res => {
                const newTask1 = [];
                const progressTask = [];
                const readyT = [];
                const doneT = [];
                res.data.map(data => {
                    if (data.status == "In progress") {
                        progressTask.push(data)
                    }
                    else if (data.status == "Ready for test") {
                        readyT.push(data)
                    }
                    else if (data.status == "Done") {
                        doneT.push(data)
                    }
                    else {
                        newTask1.push(data)

                    }
                })
                setInProgressTask(progressTask)
                setReadyTest(readyT)
                setDoneTask(doneT)
                setNewTask(newTask1)
                setisTaskLoader(false);
            })
    }
    const startSimulation = () => {
        setIsSimulation(true);
        setStartSim(true);
        autoPilot(email, password)
            .then(res => {
                setIsSimulation(false);
                const story = [];
                const newTask1 = [];
                const progressTask = [];
                const readyT = [];
                const doneT = [];
                setIdSprint(res.data.sprintData.sprint[0].sprintId)
                setProjectNewName(res.data.projectData.projectName)
                Cookies.set('autoSprintId', res.data.sprintData.sprint[0].sprintId)
                Cookies.set('autoProjectName', res.data.projectData.projectName)
                Cookies.set('autoProjectId', res.data.projectData.projectId)
                res.data.taskData.tasks.map(data => {
                    let isPresent = story.some(sData => sData.storyName == data.userStoryName)
                    let taskStr = {
                        taskName: data.taskName,
                        taskID: data.taskId,
                        taskStatus: data.status
                    }
                    const newList = {
                        storyName: data.userStoryName,
                        storyStatus: data.userStoryId,
                        taskList: []
                    }

                    if (data.status == "In progress") {
                        progressTask.push(data)
                    }
                    else if (data.status == "Ready for test") {
                        readyT.push(data)
                    }
                    else if (data.status == "Done") {
                        doneT.push(data)
                    }
                    else {
                        newTask1.push(data)

                    }

                    !isPresent && story.push(newList)
                })
                setInProgressTask(progressTask)
                setReadyTest(readyT)
                setDoneTask(doneT)
                setNewTask(newTask1)
                setStoryList(story)
            })
    }

    // Dice

    const faces = 6;
    const maxRollTimes = 10;

    const [intrvl, setIntrvl] = useState();
    const [diceFace, setDiceFace] = useState(1);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [rollTimes, setRollTimes] = useState();
    const [pullStraBool, setPullStraBool] = useState(false);
    const [pushStraBool, setPushStraBool] = useState(false);


    const rollDice = (strategy) => {
        if (strategy == "pull") {
            setPushStraBool(true);
            setPullStraBool(false);
        }
        if (strategy == "push") {
            setPushStraBool(false);
            setPullStraBool(true)
        }
        clearInterval(intrvl);
        let counter = Math.floor((Math.random() * maxRollTimes) + 1);
        setRollTimes(counter);
        let diceVal = Math.floor(Math.random() * faces) + 1;
        setDiceFace(diceVal);
        counter--;
        setRollTimes(counter);
        setisTaskLoader(true);

        moveTasks(email, password, diceVal, strategy, projectNewName, idSprint)
            .then(res => {
                getTaskList();
            })
    }

    const endingSimulation = () => {
        axios.post('http://localhost:3015/endSimulation', {
            username: email,
            password: password
        })
            .then(res => {
                setStartSim(false);
                setPullStraBool(false);
                setPushStraBool(false);
                setStoryList([]);
                setTaskList([]);
                setInProgressTask([])
                setReadyTest([])
                setDoneTask([])
                setNewTask([])
                setStoryList([])
            })
    }



    useEffect(() => {
        if (rollTimes === 0) {
            clearInterval(intrvl);
            setBtnDisabled(false);
        }
    }, [])
    return (
        <Wrapper>
            <div className="top-heading">
                <Typography className="heading" variant="h6" gutterBottom>
                    Auto Simulation
                </Typography>
                <div className="simulator-game">
                    <AutoSimulationDice rollDice={rollDice} rollTimes={rollTimes} diceFace={diceFace} btnDisabled={btnDisabled} />
                </div>
            </div>

            <div className="top-bar">
                <Button className="btn-chart" size="small" variant="contained" disabled={startSim} onClick={() => startSimulation()}>Start Simulation</Button>
                <Button className="btn-chart" size="small" variant="contained" disabled={!startSim} onClick={() => endingSimulation()}>Stop Simulation</Button>
                <Button className="btn-chart" size="small" variant="contained" disabled={pullStraBool} onClick={() => rollDice('pull')}>Pull</Button>
                <Button className="btn-chart" size="small" variant="contained" disabled={pushStraBool} onClick={() => rollDice('push')}>Push</Button>
            </div>
            {
                !isLoading ?
                    <ColorRing
                        visible={true}
                        className="loader"
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperClass="loader"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    :

                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <div className='userStory'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        User Story
                                    </Typography>
                                    {
                                        storyList.map(data => (
                                            <Card sx={{ minWidth: 275 }} className="story-card" style={{ cursor: 'pointer', height: '180px', backgroundColor: clickedStory == data.subject && '#f7cddb' }} >
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.storyName}
                                                    </Typography>
                                                    {
                                                        isTaskLoader && <ColorRing
                                                            visible={true}
                                                            className="loader"
                                                            height="20"
                                                            width="80"
                                                            ariaLabel="blocks-loading"
                                                            wrapperClass="loader"
                                                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                                        />
                                                    }

                                                </CardContent>
                                            </Card>
                                        ))
                                    }

                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='new'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        New
                                    </Typography>
                                    {
                                        newTask.map(data => (
                                            <Card sx={{ minWidth: 100 }} className="story-card">
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.taskName}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                                        {data.userStoryName}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='in progress'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        In Progress
                                    </Typography>
                                    {
                                        inProgress.map(data => (
                                            <Card sx={{ minWidth: 100 }} className="story-card">
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.taskName}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                                        {data.userStoryName}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }

                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='test'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Testing
                                    </Typography>
                                    {
                                        readyTest.map(data => (
                                            <Card sx={{ minWidth: 100 }} className="story-card">
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.taskName}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                                        {data.userStoryName}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }

                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='done'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Done
                                    </Typography>
                                    {
                                        doneTask.map(data => (
                                            <Card sx={{ minWidth: 100 }} className="story-card">
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.taskName}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                                        {data.userStoryName}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }

                                </div>
                            </Grid>
                        </Grid>
                        {/* <Grid container spacing={2}>
                        <Grid item xs={4}>
                                <div className='userStory'>
                                    {
                                        storyList.map(data => (
                                            <Card sx={{ minWidth: 275 }} className="story-card" style={{ cursor: 'pointer', backgroundColor: clickedStory == data.subject && '#f7cddb' }} onClick={() => getTaskList(data.subject)}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.storyName}
                                                    </Typography>

                                                </CardContent>
                                            </Card>
                                        ))
                                    }

                                </div>
                            </Grid>

                    </Grid> */}
                    </div>

            }
            {
                isSimulation &&
                <InfoCard>
                    <Typography className="heading" variant="h6" gutterBottom>
                        Project getting created.
                    </Typography>
                    <Typography className="heading" variant="h6" gutterBottom>
                        User Story getting created.
                    </Typography>
                    <Typography className="heading" variant="h6" gutterBottom>
                        Sprint getting created.
                    </Typography>
                    <Typography className="heading" variant="h6" gutterBottom>
                        Task getting created.
                    </Typography>
                    <p style={{ color: 'red' }}>Note: It might take 1 minute to complete all task </p>
                    <ColorRing
                        visible={true}
                        className="loader"
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperClass="loaders"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </InfoCard>
            }
        </Wrapper>
    )
}

export default AutoSimulation;