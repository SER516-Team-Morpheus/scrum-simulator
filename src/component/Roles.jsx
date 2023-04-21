import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { getMembers, getRoles } from '../apis';
import { ColorRing } from 'react-loader-spinner';
import CreateRoles from './CreateRoles';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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
.table {
    margin-top:30px;
}


`;


const Roles = () => {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    let projectName = Cookies.get('projectName');
    let projectId = Cookies.get('projectId')
    const [showDialogRoles, setShowDialogRoles] = useState(false);
    const [RoleList, setRoleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [roleData, setRoleData] = useState([]);
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'full_name' },
        { title: 'Email', field: 'email' },
        {
            title: 'Role', field: 'role'
        }
    ]);
    const handleDialogRoles = () => {
        setShowDialogRoles(!showDialogRoles);}
    // const addRoles = (data) => {
    //     setRoleList(prevState => [...prevState, data])
    // }

    const addRoles = (roleName) => {
        setIsCreateLoader(true);
        createProject(username, password, roleName, projectName)
            .then(res => {
                const data={
                    Id:res.data.roleId,
                    roleName:res.data.roleName
                }
                setRoleList(prevState => [...prevState, data])
                setIsCreateLoader(false);
                setShowDialog(false);
            })
            .catch(function(error){
                setIsCreateLoader(false);
            })
    }

    useEffect(() => {
        getRoles(username, password, projectName)
            .then(res => {
                setRoleList(res.data.roles)
                setIsLoading(false);
            })
            .catch(function (error) {
                setIsLoading(false);
            })

    }, [])

    // useEffect(() => {
    //     getMembers(username, password, projectId)
    //         .then(res => {
    //             setIsLoading(false);
    //             getRoles(username, password, projectName)
    //                 .then(roleData => {
    //                     setRoleData(roleData.roles)
    //                     setRoleList(roleData.roles.roleName)
    //                     setIsLoading(false);
    //                     console.log(roleData)
    //                     console.log(RoleList)
    //                 })
    //                 .catch(function (error) {
    //                     setIsLoading(false);
    //                 })
    //         })
    //         .catch(function (error) {
    //             setIsLoading(false);
    //         })

    // }, [])
    return (
        <Wrapper>
            <div className='heading-bar'>
                <Typography className="heading" variant="h3" gutterBottom>
                    Roles
                </Typography>
                <div>
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
                            RoleList.length > 0 ? (
                                RoleList.map(data => (
                                    <div className="project-list">
                                        <Typography className="heading" variant="h6" gutterBottom>{data.roleName}</Typography>
                                    </div>
                                ))
                            )
                                :
                                <>
                                    <Typography style={{ color: '#1976d2' }} className="heading" variant="h6" gutterBottom>
                                        No Roles Added. Please create new one.
                                    </Typography>
                                </>

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

export default Roles;