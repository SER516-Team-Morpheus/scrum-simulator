//import React, { useEffect, useState } from 'react';
import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { createRoles, getRoles } from '../apis';
import { ColorRing } from 'react-loader-spinner';
import CreateRoles from './CreateRoles';
import { ThemeProvider, createTheme, } from '@mui/material';
import Search from '@material-ui/icons/Search';
import MaterialTable from 'material-table';
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
//import Search from '@material-ui/icons/Search';
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

const Roles = ({ showItem }) => {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    let projectName = Cookies.get('projectName');
    const [showDialogRoles, setShowDialogRoles] = useState(false);
    const [RoleList, setRoleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateLoader, setIsCreateLoader] = useState(false);
    const defaultMaterialTheme = createTheme();
    const columns = [
       {
          title: 'Role',
          field: 'role'
        },
        {
          title: 'Delete Role',
          field: 'delete',
          render: rowData => (
            <button onClick={() => handleDelete(rowData)}>Delete</button>
          )
        }
      ];
      function handleDelete(rowData) {
        // Implement the code to delete the role
      }
   
    const columns1 = [
       {
          title: 'Role',
          field: 'role'
        },
        {
          title: 'Edit Role',
          field: 'edit',
          render: rowData => (
            <button onClick={() => handleEdit(rowData)}>Edit</button>
          )
        }
      ];
      function handleEdit(rowData) {
        // Implement the code to edit the role
      }
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
                    <div className="table">
                        {
                            <ThemeProvider theme={defaultMaterialTheme}>
                            <MaterialTable
                                icons={tableIcons}
                                title=""
                                columns={columns}
                                data={RoleList}
                            /*RoleList.length > 0 ? (
                                RoleList.map(data => (
                                    <div className="role-list">
                                        <Typography className="heading" variant="h6" gutterBottom>{data.roleName}</Typography>

                                    </div>
                                ))
                            )
                                :
                                <>
                                 
 
                                </>*/
                                 />
                        </ThemeProvider>

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
