import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
// import { createUserstory } from '../apis/backlog';
import Cookies from 'js-cookie';
// import Backlog from './Backlog';
import { ColorRing } from 'react-loader-spinner';
import { createMember } from '../apis';


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

const CreateMember = ({ dialog, addMember }) => {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    let projectId = Cookies.get('projectId')
    const [isCreateLoader] = useState(false);

    return (

        <Wrapper>
            <Formik
                initialValues={{
                    memberName: '',
                }}
                onSubmit={(values) => {
                    createMember(username,password,values.memberName,projectId)
                    .then(res=>{
                        dialog();
                        addMember(res.memberName)
                    })
                }}
            >
                {
                    props => (
                        <Form className="UserStory-form">
                            <Typography className="heading" variant="h4" gutterBottom>Add Member</Typography>
                            <TextField id="outlined-basic" className="subject-field" onChange={props.handleChange} label="Username" name="memberName" variant="outlined" />
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

export default CreateMember;
