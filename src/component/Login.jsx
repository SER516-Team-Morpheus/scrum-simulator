import React from "react";
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Wrapper = styled.div`

background-color: #8C1D40;
margin:0px;
padding:0px;
height:100vh;
width: 100%;
.login-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    width:400px;
    height:300px;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius:20px;
    padding:20px;
    h1 {
        text-align:center;
    }
    .textField{
        display:flex;
        justify-content: center;
        margin-bottom:20px;
    }
    .login-btn{
        position: absolute;
        bottom:10%;
        left:40%;
        // transform: translate(-50%, -50%)
    }
  }

`;


const Login = ()=>{
    return(
        <Wrapper>
           <div className="login-screen">
                <h1>Login</h1>
                <TextField id="outlined-basic" className="textField" required label="Email" variant="outlined" />
                <TextField id="outlined-basic" className="textField" required label="Password" variant="outlined" type={"password"}/>
                <Button variant="contained" className="login-btn">Login</Button>
           </div>
        </Wrapper>
        
    )
}

export default Login;