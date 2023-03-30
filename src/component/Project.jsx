import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';

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

const Project = () => {
    return (
        <Wrapper>
            <div className='heading-bar'>
                <Typography className="heading" variant="h3" gutterBottom>
                    Projects
                </Typography>
                <div>
                    <Button className="create-btn" variant="contained">Create Project</Button>
                </div>
            </div>
            <div>
                <img src={projectImg} alt="project" />
                <Typography style={{color:'#1976d2'}} className="heading" variant="h6" gutterBottom>
                    No Project. Please create new one.
                </Typography>
            </div>
        </Wrapper>

    )
}

export default Project;