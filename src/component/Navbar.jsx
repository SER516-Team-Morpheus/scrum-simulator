import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from '@mui/material/Link';
import { navItems } from './navItems';
import Cookies from 'js-cookie';
import { DiScrum } from "react-icons/di";


const Navbar = () => {

const Wrapper = styled.div`

position:fixed;
background-color: #8C1D40;
height: 100vh;
width:20%;

.top-nav {
    display:flex;
    flex-direction: column;
    margin-top: 10%;
    margin-left:30%;
    hr {
        width: 100%;
        color: grey;
        border: 1px solid grey;
        
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
    position: relative;
    svg {
        position:absolute;
        height: 80px;
        width: 100px;
        color: #8C1D40;
        left:2%;
        top:3%;
    }
    
}

.navbar-list {
    margin-top:40px;
    margin-left: 20%;
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
    const [isOptionVisible, setIsOptionVisible] = useState(false);

    useEffect(()=>{
        console.log('nav calling')
        if(Cookies.get('projectName')){
            setIsOptionVisible(true);
        }

    },[])
    return (
        <Wrapper>
            <div className='top-nav'>
                <div className='logo'>
                <DiScrum/>
                </div>
                <div className='title'>MORPHEUS</div>
            </div>
            <hr />
            <div className='navbar-list'>
                <ul>
                    {
                        navItems(isOptionVisible).map(item=>
                            item.isVisible ?  <Link href={item.url}><li>{item.name}</li></Link> : ''
                        )
                    }
                </ul>
            </div>
            <div className='bottom-bar'>

            </div>


        </Wrapper>
    )
}

export default Navbar;