import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Formik, Field, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { createProject } from '../apis';
import Cookies from 'js-cookie';
import axios from 'axios';


const Wrapper = styled.div`

height: 400px;
width:600px;
background-color: #f0edee;
position:absolute;
border-radius:20px;
top:25%;
 left: 40%;
// transform : translate(-40%, -50%)

.project-form {
    padding:20px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;

    .name-field {
        margin-bottom: 20px;
    }
    .desc-field {
        margin-bottom: 40px;
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
                            console.log(res.data)
                            storeProject(res.data)
                            // Cookies.set('token', res.data.token)
                            // navigate('/projects')
                        })
                        // .catch(error => setLoginError('Unable to login. Username or Password is incorrect'))
                }}
            >
                {
                    props => (
                        <Form className="project-form">
                            <h1>Create new Project</h1>
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
