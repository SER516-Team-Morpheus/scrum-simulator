import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateProject from './CreateProject';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { createProject, getProject } from '../apis';
import { ColorRing } from 'react-loader-spinner';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getUserStory } from '../apis/index';


const Wrapper = styled.div`
margin-left:-30px;
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

`;


const CurrentSprint = () => {
    let email = Cookies.get('username') || 'SERtestuser';
    let password = Cookies.get('password') || 'testuser';
    let projectName = Cookies.get('projectName')
    const [storyList, setStoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserStory(email, password, projectName)
            .then(res => {
                setStoryList(res.data.userStory)
                setIsLoading(false);


            })
    }, [])
    return (
        <Wrapper>
            <Typography className="heading" variant="h6" gutterBottom>
                Sprint
            </Typography>
            <div className="top-bar">
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
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <div className='userStory'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        User Story
                                    </Typography>
                                    {
                                        storyList.map(data => (
                                            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {data.subject}
                                                    </Typography>
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
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='in progress'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        In Progress
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='test'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Testing
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='done'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Done
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
            }
        </Wrapper>
    )
}

export default CurrentSprint;