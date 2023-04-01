import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Login from "./component/Login";
import LoginPage from "./component/LoginPage";
import Navbar from "./component/Navbar";
import Project from "./component/Project";
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Cookies from "js-cookie";
import Authentication from "./component/Authentication";
import ProjectDashboard from "./component/ProjectDashboard";


const Wrapper = styled.div`
margin:0px;
padding:0px;


`;

const App = () => {
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
              <Route exact path="/projects" element={<Project />} />
              <Route path="/projects/:id" element={<Login/>}/>
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;
