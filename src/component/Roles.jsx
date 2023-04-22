import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { createRoles, getRoles } from '../apis';
import { ColorRing } from 'react-loader-spinner';
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
    let password = Cookies.get('password');
    let projectName = Cookies.get('projectName');
    const [showDialogRoles, setShowDialogRoles] = useState(false);
    const [RoleList, setRoleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateLoader, setIsCreateLoader] = useState(false);

    const handleDialogRoles = () => {
        setShowDialogRoles(!showDialogRoles);}
    // const addRoles = (data) => {
    //     setRoleList(prevState => [...prevState, data])
    // }

    const addRoles = (roleName) => {
        setIsCreateLoader(true);
        createRoles(username, password, roleName, projectName)
            .then(res => {
                const data={
                    Id:res.data.roleId,
                    roleName:res.data.roleName
                }
                setRoleList(prevState => [...prevState, data])
                setIsCreateLoader(false);
                setShowDialogRoles(false);
            })
            .catch(function(error){
                setIsCreateLoader(false);
            })
    }

    useEffect(() => {
        getRoles(username,password,projectName)
            .then(res => {
                setRoleList(res.data.roles)
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
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialogRoles(true)}>Create Role</Button>
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
                                        <Typography className="heading" variant="h6" gutterBottom>{data.roleName}</Typography>

                                    </div>
                                ))
                            )
                                :
                                <>
                                 
 
                                </>

                        }
                        {showDialogRoles &&
                            <CreateRoles
                                dialog={handleDialogRoles}
                                addRoles={addRoles}
                                isCreateLoader={isCreateLoader}
                            />
                        }

                    </div>

            }
        </Wrapper>

    )
}
export default Roles;