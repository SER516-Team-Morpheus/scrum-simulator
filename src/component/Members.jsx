import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateProject from './CreateProject';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { createProject, getMembers, getProject } from '../apis';
import { ColorRing } from 'react-loader-spinner';
import CreateMember from './CreateMember';
import CreateRoles from './CreateRoles';

const Wrapper = styled.div`

.heading-bar {
    display:flex;
    justify-content: space-between;
    margin-top:20px
}
.heading{
    // margin-top: 10px;
    color: #8C1D40;
}

.create-btn {
    margin-top:10%;
    background-color: #8C1D40;
}

img {
    height:300px;
    width: 500px;
    opacity:0.1;
    margin: 100px 200px;
    position:absolute;
}

.project-list {
    margin-top:30px;
    cursor:pointer;
    a {
        text-decoration:none;
    }        
}

.loader {
    position: relative;
    top:50%;
    left:30%;
}


`;


const Members = () => {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    let projectName = Cookies.get('projectName');
    let projectId = Cookies.get('projectId')
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogRoles, setShowDialogRoles] = useState(false);
    const [memberList, setMemberList] = useState([]);
    const [RoleList, setRoleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    const handleDialogRoles = () => {
        setShowDialogRoles(!showDialogRoles);
    }
    const addMember = (data) => {
        setMemberList(prevState => [...prevState, data])
    }
    const addRoles= (data) => {
        setRoleList(prevState => [...prevState, data])
    }

    useEffect(() => {
        getMembers(username, password, projectId)
            .then(res => {
                setMemberList(res.data.data)
                setRoleList(res.data.data)
                setIsLoading(false);
            })
            .catch(function(error){
                setIsLoading(false);
            })
    }, [])
    return (
        <Wrapper>
            <div className='heading-bar'>
                <Typography className="heading" variant="h3" gutterBottom>
                    Members
                </Typography>
                <div>
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialog(true)}>Add Members</Button>
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialogRoles(true)}>Add roles</Button>

                </div>
            </div>
            {
                isLoading ?
                    <ColorRing
                        visible={true}
                        className="loader"
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperClass="loader"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    :
                    <div>
                        {
                            memberList.length > 0 ? (
                                memberList.map(data => (
                                    <div className="project-list">
                                        <Typography className="heading" variant="h9" gutterBottom>{data.full_name}</Typography>
                                    </div>
                                ))
                            )
                                :
                                <>
                                    <img src={projectImg} alt="project" />
                                    <Typography style={{ color: '#1976d2' }} className="heading" variant="h6" gutterBottom>
                                        No Members. Please create new one.
                                    </Typography>
                                </>

                        }
                        {showDialog &&
                            <CreateMember
                                dialog={handleDialog}
                                addMember={addMember}
                            />
                        }
                         {showDialogRoles &&
                            <CreateRoles
                                dialog={handleDialogRoles}
                                addRoles={addRoles}
                            />
                        }
                       

                    </div>
            }


        </Wrapper>
    )
}

export default Members;