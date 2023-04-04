import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Field, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { createProject } from '../apis';
import Cookies from 'js-cookie';
import axios from 'axios';


const Wrapper = styled.div`

height: 400px;
width:600px;
background-color: #f7f3f2;
border: 2px solid #8C1D40;
position:absolute;
z-index:100;
border-radius:20px;
top:25%;
left: 40%;

.project-form {
    padding:20px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;

    .heading {
        color: #8C1D40;
        margin-bottom: 40px;
    }

    .name-field {
        margin-bottom: 20px;
    }
    .desc-field {
        margin-bottom: 40px;
    }
    .crt-btn {
        background-color:#8C1D40;
    }
    .cancel-btn {
        margin-top:20px;
        background-color:grey;
    }
}

`;

const CreateProject = ({dialog, storeProject}) => {
    return (
        
        <Wrapper>
            <Formik
                initialValues={{
                    email: '',
                    password: '',

                }}
                onSubmit={(values) => {
                    let email = Cookies.get('username') || 'SERtestuser';
                    let password = Cookies.get('password') || 'testuser';
                    console.log({'1':email,'2':password,'a':values.name,'b':values.description})
                    createProject(email,password,values.name, values.description)
                        .then(res => {
                            storeProject(res.data)
                        })
                        // .catch(error => setLoginError('Unable to login. Username or Password is incorrect'))
                }}
            >
                {
                    props => (
                        <Form className="project-form">
                            <Typography className="heading" variant="h4" gutterBottom>Create Project</Typography>
                            <TextField id="outlined-basic" className="name-field" onChange={props.handleChange} name="name"  required label="Name" variant="outlined" />
                            <TextField id="outlined-basic" className="desc-field" onChange={props.handleChange} name="description"  required label="Description" variant="outlined" />
                            <Button variant="contained"  className="crt-btn" type="submit">Create</Button>
                            <Button variant="contained"  className="cancel-btn" onClick={dialog}>Cancel</Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    )
}

export default CreateProject;
