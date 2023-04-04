import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const Wrapper = styled.div`

.heading {
    text-align:center;
    margin-top:30px;
}

.project-list {
   text-align:center;
}

.icon {
    height: 200px;
    width:20px;
    background-color:red;
}

li {
    text-decoration: none;
    list-style-type: none;
}



`;

const ProjectDashboard = () => {
    return (
        <Wrapper>
            <Typography className="heading" variant="h3" gutterBottom>
                Projects
            </Typography>
            <div className="project-list">
                <li>
                    <Typography className="heading" variant="h5" gutterBottom>
                        Sample Project 1
                    </Typography>
                </li>
            </div>
        </Wrapper>

    )
}

export default ProjectDashboard;