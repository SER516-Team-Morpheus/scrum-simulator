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



const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const Roles = () => {
    let username = Cookies.get('username');
    let password = Cookies.get('password') || 'testuser';
    let projectName=Cookies.get('projectName');
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
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
    const addRoles = (data) => {
        setRoleList(prevState => [...prevState, data])
    }
    
    useEffect(() => {
        getMembers(username, password, projectId)
            .then(res => {
                
                setRoleList(res.data.data)
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
                    <div className="table">
                        {showDialogRoles &&
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