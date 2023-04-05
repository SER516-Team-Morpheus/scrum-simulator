import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateProject from './CreateProject';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { createProject } from '../apis';

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

const Project = ({ showItem }) => {
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([
        // { projectName: 'unique', description: 'this is description' },
        // { projectName: 'unique', description: 'this is description' },
        // { projectName: 'unique', description: 'this is description' },
        // { projectName: 'unique', description: 'this is description' }
    ]);


    const storeProject = (data) => {
        setProjectList([data]);
        setShowDialog(false);
    }
    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    const selectProject = (name) => {
        console.log(name,'check for e')
        Cookies.set('projectName', name)
        navigate('/projects/'+ Cookies.get('projectName'))
        navigate('/backlog')
        showItem();
    }


    const createNewProject = (name, description) => {
        let email = Cookies.get('username') || 'SERtestuser';
        let password = Cookies.get('password') || 'testuser';
        createProject(email, password, name, description)
            .then(res => {
                storeProject(res.data)
            })
    }
    return (
        <Wrapper>
            <div className='heading-bar'>
                <Typography className="heading" variant="h3" gutterBottom>
                    Projects
                </Typography>
                <div>
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialog(true)}>Create Project</Button>
                </div>
            </div>
            <div>
                {
                    projectList.length > 0 ? (
                        projectList.map(data => (
                            <div className="project-list">
                                <Typography className="heading" variant="h6" gutterBottom><Link onClick={()=>selectProject(data.projectName)}>{data.projectName}</Link></Typography>
                                <Typography className="heading" variant="h9" gutterBottom>{data.description}</Typography>
                            </div>
                        ))
                    )
                        :
                        <>
                            <img src={projectImg} alt="project" />
                            <Typography style={{ color: '#1976d2' }} className="heading" variant="h6" gutterBottom>
                                No Project. Please create new one.
                            </Typography>
                        </>

                }
                {showDialog && <CreateProject dialog={handleDialog} storeProject={storeProject} name={'Project'} createNewProject={createNewProject} />}

            </div>

        </Wrapper>

    )
}

export default Project;