import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateProject from './CreateProject';
import Link from '@mui/material/Link';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { createProject, getProject, getSprint, getStoryTask, updateTask } from '../apis';
import { ColorRing } from 'react-loader-spinner';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getUserStory } from '../apis/index';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SimulatorGame from './SimulatorGame';

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


const CurrentSprint = () => {
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
    const [isTaskLoader, setisTaskLoader] = useState(false);

    const navigate = useNavigate();

    const updatingTask = (taskName, status, storyName) => {
        setisTaskLoader(true);
        updateTask(email, password, projectName, Cookies.get('selectedStory'), taskName, status)
            .then(res => {
                getStoryTask(email, password, projectName, Cookies.get('selectedStory'))
                    .then(res => {
                        setisTaskLoader(false);

                        // setTaskList(res.data.details)
                        const newTask1 = [];
                        const progressTask = [];
                        const readyT = [];
                        const doneT = [];
                        res.data.details.map(data => {
                            if (data.status_extra_info.name == "In progress") {
                                progressTask.push(data)
                            }
                            else if (data.status_extra_info.name == "Ready for test") {
                                readyT.push(data)
                            }
                            else if (data.status_extra_info.name == "Done") {
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

                    })
            })
    }

    const getTaskList = (stName) => {
        setClickedStory(stName)
        Cookies.set('selectedStory', stName)
        setisTaskLoader(true)
        getStoryTask(email, password, projectName, stName)
            .then(res => {
                setisTaskLoader(false)
                const newTask1 = [];
                const progressTask = [];
                const readyT = [];
                const doneT = [];
                res.data.details.map(data => {
                    if (data.status_extra_info.name == "In progress") {
                        progressTask.push(data)
                    }
                    else if (data.status_extra_info.name == "Ready for test") {
                        readyT.push(data)
                    }
                    else if (data.status_extra_info.name == "Done") {
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

            })
    }



    useEffect(() => {
        getSprint(email, password, projectId)
            .then(res => {
                const userStoryArray = [];
                setIsLoading(false);
                const latestSprint = res.data.sprints[res.data.sprints.length - 1];
                Cookies.set("sprintID", latestSprint.id)
                setSprintDetails(latestSprint)
                latestSprint.user_stories.map(data => {
                    const userStory = {
                        assignee: data.assigned_to,
                        id: data.id,
                        status: data.status_extra_info.name,
                        subject: data.subject,
                        totalPoints: data.totalPoints
                    }

                    userStoryArray.push(userStory)
                })
                setStoryList(userStoryArray)



            })


    }, [])
    return (
        <Wrapper>
            <div className="top-heading">
                <Typography className="heading" variant="h6" gutterBottom>
                    Sprint
                </Typography>
                <div className="simulator-game">
                    <SimulatorGame />
                </div>
            </div>

            <div className="top-bar">
                <Button className="btn-chart" size="small" variant="contained" onClick={() => navigate(`/sprintBurndown/${Cookies.get('sprintID')}`)}>Burndown</Button>
                <Button className="btn-chart" size="small" variant="contained" onClick={() => navigate('/autosimulation')}>Auto Simulation</Button>
                <Button className="btn-chart" size="small" variant="contained" onClick={() => navigate(`/issues`)}>Issues</Button>


            </div>
            {
                isLoading ?
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
                                            <Card sx={{ minWidth: 275 }} className="story-card" style={{ cursor: 'pointer', backgroundColor: clickedStory == data.subject && '#f7cddb' }} onClick={() => getTaskList(data.subject)}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.subject}
                                                    </Typography>
                                                    {
                                                            isTaskLoader && clickedStory == data.subject && <ColorRing
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
                                                    <div className="arrow">
                                                        <ArrowForwardIosIcon color="grey" fontSize='5px'
                                                            onClick={() => updatingTask(data.taskName, 'In progress')}
                                                        />
                                                       
                                                    </div>


                                                </CardContent>
                                            </Card>
                                        ))
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                {console.log(inProgress, 'in progress task')}
                                {console.log(newTask, 'new task')}
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
                                                    <div className="arrow">
                                                        <ArrowBackIosNewIcon color="grey" fontSize='5px'
                                                            onClick={() => updatingTask(data.taskName, 'New')}
                                                        />

                                                        <ArrowForwardIosIcon color="grey" fontSize='5px'
                                                            onClick={() => updatingTask(data.taskName, 'Ready for test')}
                                                        />
                                                    </div>

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
                                                    <div className="arrow">
                                                        <ArrowBackIosNewIcon color="grey" fontSize='5px'
                                                            onClick={() => updatingTask(data.taskName, 'In progress')}
                                                        />

                                                        <ArrowForwardIosIcon color="grey" fontSize='5px'
                                                            onClick={() => updatingTask(data.taskName, 'Done')}
                                                        />
                                                    </div>

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
                                                </CardContent>
                                            </Card>
                                        ))
                                    }

                                </div>
                            </Grid>
                        </Grid>
                    </div>
            }
        </Wrapper>
    )
}

export default CurrentSprint;