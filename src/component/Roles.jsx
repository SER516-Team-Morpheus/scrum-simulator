import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import projectImg from '../img/project-img.jpg';
import CreateRoles from './CreateRoles';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { createRoles, getRoles } from '../apis';
import { ColorRing } from 'react-loader-spinner';
//import { getRole } from '@testing-library/react';
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
const CreateDialog = styled.div`

height: 400px;
width:600px;
background-color: #d7dbd8;
position:absolute;
top:50%;
left: 50%;
transform : translate(-40%, -70%)
`;

const Roles = ({ showItem }) => {
    let username = Cookies.get('username');
    let password = Cookies.get('password') || 'testuser';
    let projectName=Cookies.get('projectName');
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateLoader, setRolesLoading] = useState(false);
    const [RoleList, setRoleList] = useState([]);

    const storeRole = (data) => {
        setRoleList([data]);
        setShowDialog(false);
    }
    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    /*const selectRole = (roleName, projectName) => {
        Cookies.set('roleName', roleName)
        Cookies.set('projectName',projectName)
        navigate('/roles/' + Cookies.get('roleName'))
        navigate('/backlog')
        showItem();
    }*/
    const createNewRole = (roleName, projectName) => {
        setRolesLoading(true);
        createRoles(username, password, roleName, projectName)
          .then(res => {
            const newRole = res.data.roles;
            setRoleList(prevState => [...prevState, newRole]);
            setRolesLoading(false);
            setShowDialog(false);
          })
          .catch(function (error) {
            setRolesLoading(false);
          })
    }
    
    useEffect(() => {
        getRoles(username,password,projectName)
            .then(res => {
                setRoleList(res.data.roles.roleName)
                setIsLoading(false);
            })
            .catch(function (error) {
                setIsLoading(false);
            })

    }, [])
    return (
        <Wrapper>
            <div className='heading-bar'>
                <Typography className="heading" variant="h3" gutterBottom>
                    Roles
                </Typography>
                <div>
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialog(true)}>Create Role</Button>
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
                            RoleList.length > 0 ? (
                                RoleList.map(data => (
                                    <div className="role-list">
                                        <Typography className="heading" variant="h6" gutterBottom><Link onClick={() => selectRole(data.name,data.id)}>{data.name}</Link></Typography>
                                        <Typography className="heading" variant="h9" gutterBottom>{data.description}</Typography>
                                    </div>
                                ))
                            )
                                :
                                <>
                                 
 
                                </>

                        }
                        {showDialog &&
                            <CreateRoles
                                dialog={handleDialog}
                                createNewRole={createNewRole}
                                //newRole={'Roles'}
                                setRolesLoading={setRolesLoading}
                            />
                        }

                    </div>

            }
        </Wrapper>

    )
}
export default Roles;