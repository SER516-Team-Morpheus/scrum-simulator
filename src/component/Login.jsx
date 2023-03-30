import React from "react";
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Field, Form } from 'formik';
import { login } from "../apis";

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


const Login = () => {
    return (
        <Wrapper>
            <div className="login-screen">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        console.log(values.email)
                        login(values.email,values.password)
                        .then(res=>{
                            console.log(res)
                        })
                    }}
                >
                    {
                        props => (

                      
                    <Form>
                    <h1>Login</h1>
                    <TextField id="outlined-basic" onChange={props.handleChange} name="email" className="textField" required label="Email" variant="outlined" />
                    <TextField id="outlined-basic" onChange={props.handleChange} name="password" className="textField" required label="Password" variant="outlined" type={"password"} />
                    <Button variant="contained" className="login-btn" type="submit">Login</Button>
                    </Form>
                      )
                    }
                </Formik>
            </div>
        </Wrapper>

    )
}

export default Login;