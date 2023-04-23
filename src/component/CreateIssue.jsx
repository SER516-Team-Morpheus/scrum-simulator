import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import { ColorRing } from 'react-loader-spinner';


const Wrapper = styled.div`

height: 300px;
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

const CreateIssue = ({ dialog, storeProject, name, createUserStory, createNewProject, isCreateLoader }) => {
    return (

        <Wrapper>
            <Formik
                initialValues={{
                    subject: '',
                }}
                onSubmit={(values) => {
                    createNewProject(values.name)
                }}
            >
                {
                    props => (
                        <Form className="project-form">
                            <Typography className="heading" variant="h4" gutterBottom>Create Issue</Typography>
                            <TextField id="outlined-basic" className="name-field" onChange={props.handleChange} name="subject" required label="Subject" variant="outlined" />
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

export default CreateIssue;
