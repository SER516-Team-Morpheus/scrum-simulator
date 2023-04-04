import React, { useState } from 'react';
import styled from 'styled-components';
import InteractiveList from './InteractiveList'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
    a {
        text-decoration:none;
    }        
}
`;

const Backlog = () => {
    console.log("backlog page called")
    const [showDialog, setShowDialog] = useState(false);
  return (
    <Wrapper>
        <div className='heading-bar'>
                <Typography className="heading" variant="h3" gutterBottom>
                    Backlog items
                </Typography>
                <div>
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialog(true)}>Create User Story</Button>
                </div>
        </div>
        <InteractiveList />
    </Wrapper>
    
  )
}

export default Backlog