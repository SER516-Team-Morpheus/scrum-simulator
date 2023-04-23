import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { deleteMember, getMembers, getRoles } from '../apis';
import { ColorRing } from 'react-loader-spinner';
import CreateMember from './CreateMember';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, } from '@mui/material';
import Select from '@mui/material/Select';
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
    const [roleData, setRoleData] = useState([]);
    const defaultMaterialTheme = createTheme();

    const [columns, setColumns] = useState([
        { title: 'Name', field: 'full_name' },
        { title: 'Email', field: 'email' },
        {
            title: 'Role',
            field: 'role',
            render: rowData => (
                <Select id="role-name" className="subject-field" value={''} label="Roles" name="roleName" variant="outlined">
                {
                    roleData.map(role=> {
                        return (<MenuItem value={role.roleName}>{role.roleName}</MenuItem>)
                    }
                    )
                }
        
            </Select>
            ),
          },
    ]);


    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    const handleDialogRoles = () => {
        setShowDialogRoles(!showDialogRoles);
    }
    const addMember = (data,mid) => {
        const newData={
            id:mid,
            email:`${data}@asu.edu`,
            full_name:data,
            role:'UX'
        }
        setMemberList(prevState => [...prevState, newData])
    }

    useEffect(() => {
        getMembers(username, password, projectId)
            .then(res => {
                setMemberList(res.data.data)
                setIsLoading(false);
                getRoles(username, password, projectName)
                    .then(roleData => {
                        {console.log(roleData)}
                        setRoleData(roleData.data.roles)
                        setMemberList(res.data.data)
                        setIsLoading(false);
                    })
                    .catch(function (error) {
                        setIsLoading(false);
                    })
            })
            .catch(function (error) {
                setIsLoading(false);
            })

    }, [])
    return (
        <Wrapper>
            <div className='heading-bar'>
                {console.log(roleData,'body role')}
                <Typography className="heading" variant="h3" gutterBottom>
                    Members
                </Typography>
                <div>
                    <Button className="create-btn" variant="contained" onClick={() => setShowDialog(true)}>Add Members</Button>
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
                        <ThemeProvider theme={defaultMaterialTheme}>

                            <MaterialTable
                                icons={tableIcons}
                                title=""
                                columns={columns}
                                data={memberList}
                            editable={{
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            console.log(oldData,'old')
                                            deleteMember(username,password,oldData.id)
                                            .then(res=>{
                                                const dataDelete = [...memberList];
                                                const index = oldData.tableData.id;
                                                dataDelete.splice(index, 1);
                                                setMemberList([...dataDelete]);
                                            })

                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                            />

                        </ThemeProvider>
                        {showDialog &&
                            <CreateMember
                                dialog={handleDialog}
                                addMember={addMember}
                            />
                       }
                    </div>

            }

             

        </Wrapper>
    )
}

export default Members;