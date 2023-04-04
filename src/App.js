import React,{useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Project from "./component/Project";
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Cookies from "js-cookie";
import Backlog from "./component/Backlog";
import Authentication from "./component/Authentication";
import ProjectDashboard from "./component/ProjectDashboard";


const Wrapper = styled.div`
margin:0px;
padding:0px;


`;

const App = () => {
  const [itemVisible, setItemVisible]=useState(false);
  
  const showItem = ()=>{
    setItemVisible(true);
  }
  
  console.log('app')
  useEffect(()=>{
    console.log('nav calling')
    if(Cookies.get('projectName')){
        setItemVisible(true);
        console.log('app calling')
    }

},[Cookies.get('projectName')])
  return (
    <Wrapper>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
      </Routes>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Navbar />
          </Grid>
          <Grid item xs={8}>
            <Routes>
              <Route exact path="/projects" element={<Project showItem={showItem}/>} />
              <Route path="/projects/:id" element={<Login/>}/>
              <Route path="/backlog" element={<Backlog/>}/>
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;
