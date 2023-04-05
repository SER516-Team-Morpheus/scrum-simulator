import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateProject from './CreateProject';
import CreateUserStory from './CreateUserStory'
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { RxDragHandleHorizontal } from "react-icons/rx";


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
    margin-bottom: 7px;
    a {
        text-decoration:none;
    }        
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
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const [storyList, setStoryList] = useState([
        { storyName: 'Story1', description: 'this is description' },
        { storyName: 'Story2', description: 'this is description' },
        { storyName: 'Story3', description: 'this is description' },
        { storyName: 'Story4', description: 'this is description' }
    ]);

    const storeProject = (data) => {
        setStoryList(prevData=>[...prevData,data])
        setShowDialog(false);
    }
    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    const selectProject = () => {
        Cookies.set('projectName', 'unique')
        navigate('/projects/' + Cookies.get('projectName'))
        showItem();
    }
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
            <div>
                {
                    storyList.length > 0 ? (
                        storyList.map((data,index) => (
                            <div className="story-list">
                                <Typography className="heading" variant="h7" gutterBottom>
                                   <RxDragHandleHorizontal className="drag-icon"/><Link>{index+1}. {data.storyName}</Link>
                                    </Typography>
                                {/* <Typography className="heading" variant="h9" gutterBottom>{data.description}</Typography> */}
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
                {showDialog && <CreateUserStory dialog={handleDialog} storeProject={storeProject} name={'Create Story'}/>}

            </div>

        </Wrapper>

    )
}

export default Backlog;