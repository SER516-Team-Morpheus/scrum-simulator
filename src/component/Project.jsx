import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateProject from './CreateProject';

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
}

img {
    height:300px;
    width: 500px;
    opacity:0.1;
    margin: 100px 200px;
    position:absolute;
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

const Project = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [projectList, setProjectList] = useState([]);

    const storeProject = (data) => {
        setProjectList([data]);
        setShowDialog(false);
    }
    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    return (
        <Wrapper>
            {console.log(projectList,'check p list')}
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
                        projectList.map(data => <li>{data.name}</li>)
                    )
                        :
                        <Typography style={{ color: '#1976d2' }} className="heading" variant="h6" gutterBottom>
                            No Project. Please create new one.
                        </Typography>
                }
                <img src={projectImg} alt="project" />

                {showDialog && <CreateProject dialog={handleDialog} storeProject={storeProject} />}

            </div>

        </Wrapper>

    )
}

export default Project;