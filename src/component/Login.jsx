import React,{useState} from "react";
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import {  useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import { login } from "../apis";
import Cookies from 'js-cookie';
import { ColorRing } from 'react-loader-spinner';


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
        bottom:5%;
        left:40%;
    }
  }
  svg {
    height:30px;
}
  .loader {
    height: 30px;
    position: relative;
    top:50%;
    left:30%;
}

`;


const Login = () => {
    const navigate = useNavigate();
    const [loginError,setLoginError] = useState('');
    const [isCreateLoader, setIsCreateLoader] = useState(false);
 
    return (
        <Wrapper>
            <div className="login-screen">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        
                    }}
                    onSubmit={(values) => {
                        setIsCreateLoader(true);
                        setLoginError('');
                        login(values.email,values.password)
                        .then(res=>{
                            Cookies.set('token',res.data.token)
                            Cookies.set('username',values.email)
                            Cookies.set('password',values.password)
                            setIsCreateLoader(false);
                           
                            navigate('/projects')
                        })
                        .catch(error=>{
                            setIsCreateLoader(false);
                            setLoginError('Unable to login. Username or Password is incorrect')
                        })
                    }}
                >
                    {
                        props => (

                      
                    <Form>
                    <h1>Login</h1>
                    <TextField id="outlined-basic" onChange={props.handleChange} name="email" className="textField" required label="Username" variant="outlined" />
                    <TextField id="outlined-basic" onChange={props.handleChange} name="password" className="textField" required label="Password" variant="outlined" type={"password"} />
                    {loginError ? <p style={{color:'red'}}>{loginError}</p>:''}
                    <Button variant="contained" className="login-btn" type="submit">
                    {
                                    isCreateLoader ?
                                        <ColorRing
                                            visible={true}
                                            className="loader"
                                            height="80"
                                            width="80"
                                            ariaLabel="blocks-loading"
                                            wrapperClass="loaders"
                                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                        />
                                        :
                                        'Login'
                                }
                    </Button>
                    </Form>
                      )
                    }
                </Formik>
                
            </div>
        </Wrapper>

    )
}

export default Login;