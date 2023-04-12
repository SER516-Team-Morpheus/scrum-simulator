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
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

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
import { forwardRef } from 'react';



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
    const [memberList, setMemberList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const defaultMaterialTheme = createTheme();

    const [columns, setColumns] = useState([
        { title: 'Name', field: 'full_name' },
        { title: 'Email', field: 'email' },
        { title: 'Role', field: 'role' }
    ]);


    const handleDialog = () => {
        setShowDialog(!showDialog);
    }
    const addMember = (data) => {
        setMemberList(prevState => [...prevState, data])
    }

    useEffect(() => {
        getMembers(username, password, projectId)
            .then(res => {
                setMemberList(res.data.data)
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
                            // editable={{
                            //     onRowAdd: newData =>
                            //         new Promise((resolve, reject) => {
                            //             setTimeout(() => {
                            //                 setData([...data, newData]);

                            //                 resolve();
                            //             }, 1000)
                            //         }),
                            //     onRowUpdate: (newData, oldData) =>
                            //         new Promise((resolve, reject) => {
                            //             setTimeout(() => {
                            //                 const dataUpdate = [...data];
                            //                 const index = oldData.tableData.id;
                            //                 dataUpdate[index] = newData;
                            //                 setData([...dataUpdate]);

                            //                 resolve();
                            //             }, 1000)
                            //         }),
                            //     onRowDelete: oldData =>
                            //         new Promise((resolve, reject) => {
                            //             setTimeout(() => {
                            //                 const dataDelete = [...data];
                            //                 const index = oldData.tableData.id;
                            //                 dataDelete.splice(index, 1);
                            //                 setData([...dataDelete]);

                            //                 resolve()
                            //             }, 1000)
                            //         }),
                            // }}
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