import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from '@mui/material/Link';


const Navbar = () => {
    const Wrapper = styled.div`

position:fixed;
background-color: #8C1D40;
height: 100vh;
width:20%;

.top-nav {
    display:flex;
    flex-direction: column;
    margin-left: 28%;
    margin-top: 10%;
    hr {
        width: 100%;
        color: grey;
        
    }
    .title {
        color: white;
        font-weight: bold;
    }
}

.logo {
    height:100px;
    width:100px;
    border-radius:50px;
    background-color: white;
    margin-bottom: 20px;
}

.navbar-list {
    margin-top:40px;
    margin-left: 10%;
    li {
        list-style-type: none;
        margin-bottom: 30px;
        color: white;
        font-weight: bold;
    }
}

.bottom-bar {
    position: absolute;
    bottom: 5%;
    height:100px;
    width:80%;
    border-radius: 25px;
    background-color:white;
    left:10%;
}
a {
    text-decoration: none;
}
`;
    const [isSelected, setIsSelected] = useState({});
    return (
        <Wrapper>
            <div className='top-nav'>
                <div className='logo'></div>
                <div className='title'>MORPHEUS</div>
            </div>
            <hr />
            <div className='navbar-list'>
                <ul>
                    <Link href="/projects"><li>Projects</li></Link>
                    <Link href="/backlog"><li>Backlog</li></Link>
                    <Link href="/sprints"><li>Sprints</li></Link>
                    <Link href="/teamMembers"><li>Team members</li></Link>
                </ul>
            </div>
            <div className='bottom-bar'>

            </div>


        </Wrapper>
    )
}

export default Navbar;