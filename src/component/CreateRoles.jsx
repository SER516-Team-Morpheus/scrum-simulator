import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import { ColorRing } from 'react-loader-spinner';
import { createRoles } from '../apis';


const Wrapper = styled.div`

// height: 300px;
// width:600px;
width: 30%;
background-color: #f7f3f2;
border: 2px solid #8C1D40;
position:absolute;
z-index:100;
border-radius:20px;
top:25%;
left: 40%;

.loaders {
    height:30px;
}

.UserStory-form {
    padding:20px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;

    .heading {
        color: #8C1D40;
        margin-bottom: 40px;
    }

    .subject-field {
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

const CreateRoles = ({ dialog, addRoles }) => {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    let projectName = Cookies.get('projectName');
    const [isCreateLoader, setIsCreateLoader] = useState(false);

    return (

        <Wrapper>
            <Formik
                initialValues={{
                    roleName:'',
                }}
                onSubmit={(values) => {
                    addRoles(values.roleName)
                }}
            >
                {
                    props => (
                        <Form className="UserStory-form">
                            <Typography className="heading" variant="h4" gutterBottom>Add Role</Typography>
                            <TextField id="outlined-basic" className="subject-field" onChange={props.handleChange} label="Role" name="roleName" variant="outlined" />

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
                                        'Add'
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

export default CreateRoles;
