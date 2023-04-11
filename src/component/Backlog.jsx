import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateUserStory from './CreateUserStory'
import Link from '@mui/material/Link';
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { RxDragHandleHorizontal } from "react-icons/rx";
import { createUserstory } from '../apis/backlog';
import { getUserStory } from '../apis/index';
import { ColorRing } from 'react-loader-spinner';
import Chip from '@mui/material/Chip';



const Wrapper = styled.div`

.heading-bar {
    display:flex;
    justify-content: space-between;
    margin-top:20px
}
.heading{
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

.story-list {
    height: 30px;
    padding:10px;
    background-color: #e8e7e6;
    display:flex;
    justify-content: space-between;
    margin-bottom: 7px;
    a {
        text-decoration:none;
    }        
}

.story-title {
    margin-top: 5px;
}

.loader {
    position: relative;
    top:50%;
    left:30%;
}

.click-details {
    cursor: pointer;
    margin:0px;
    padding: 0px;
}
.story-assignee {
    p {
        margin: 0px;
        padding: 0px;
    }
    margin-top:5px;
    
}
`;

const CreateDialog = styled.div`

height: 400px;
width:600px;
background-color: #d7dbd8;
position:absolute;
top:50%;
left: 50%;
transform : translate(-40%, -70%)



`;

const Backlog = ({ showItem }) => {
    let email = Cookies.get('username') || 'SERtestuser';
    let password = Cookies.get('password') || 'testuser';
    let projectName = Cookies.get('projectName')
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const [storyList, setStoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const storeStory = (data) => {
        setStoryList(prevData => [...prevData, data])
        setShowDialog(false);
    }
    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    const selectStory = (name) => {
        navigate(`/storyDetails/${name}`)
    }

    const getStatus = (data) => {
        if(data == "New") return <Chip label="New" color="primary" />
        else if( data == "In progress" ) return <Chip label="In progress" color="primary" />
        else if( data == "Ready for test" ) return <Chip label="Ready for test" color="primary" />
        else return <Chip label="Done" color="success" />

    }

    useEffect(() => {
        getUserStory(email, password, projectName)
            .then(res => {
                setIsLoading(false);
                setStoryList(res.data.userStory)

            })
    }, [])

    return (
        <Wrapper>
            <div className='heading-bar'>
                <Typography className="heading" variant="h3" gutterBottom>
                    Backlog
                </Typography>
                <div>
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialog(true)}>Create User Story</Button>
                </div>
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
                        {
                            storyList.length > 0 ? (
                                storyList.map((data, index) => (
                                    <div className="story-list">
                                        <div className='story-title'>
                                            <Typography className="heading" variant="h7" gutterBottom>
                                                <RxDragHandleHorizontal className="drag-icon" /><Link onClick={() => selectStory(data.subject)} className="click-details">{index + 1}. {data.subject}</Link>
                                            </Typography>
                                        </div>
                                        <div className="story-status">
                                           {getStatus(data.status)}
                                        </div>
                                        <div className='story-assignee'>
                                            <p>{data.assignee}</p>
                                        </div>
                                    </div>
                                ))
                            )
                                :
                                <>
                                    <img src={projectImg} alt="project" />
                                    <Typography style={{ color: '#1976d2' }} className="heading" variant="h6" gutterBottom>
                                        No Story. Please create new one.
                                    </Typography>
                                </>

                        }

                        {showDialog &&
                            <CreateUserStory
                                dialog={handleDialog}
                                storeUserStory={storeStory}
                            />
                        }

                    </div>
            }

        </Wrapper>

    )
}

export default Backlog;