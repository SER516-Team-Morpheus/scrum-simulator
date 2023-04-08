import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Field, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { createProject } from '../apis';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';


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

svg {
    height:30px;
}

`;

const CreateProject = ({ dialog, storeProject, name, createUserStory, createNewProject, isCreateLoader }) => {
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
                    console.log({ '1': email, '2': password, 'a': values.name, 'b': values.description })

                    name == 'Project' ? createNewProject(values.name, values.description)
                        : createUserStory(values.name)
                    // createProject(email,password,values.name, values.description)
                    //     .then(res => {
                    //         storeProject(res.data)
                    //     })
                    // .catch(error => setLoginError('Unable to login. Username or Password is incorrect'))
                }}
            >
                {
                    props => (
                        <Form className="project-form">
                            <Typography className="heading" variant="h4" gutterBottom>Create{' ' + name}</Typography>
                            <TextField id="outlined-basic" className="name-field" onChange={props.handleChange} name="name" required label="Name" variant="outlined" />
                            <TextField id="outlined-basic" className="desc-field" onChange={props.handleChange} name="description" required label="Description" variant="outlined" />
                            <Button variant="contained" className="crt-btn" type="submit">
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
                                        'Create'
                                }

                            </Button>
                            <Button variant="contained" className="cancel-btn" onClick={dialog}>Cancel</Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    )
}

export default CreateProject;
