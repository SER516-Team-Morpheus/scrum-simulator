import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import LoginPage from "./component/LoginPage";
import Navbar from "./component/Navbar";
import Project from "./component/Project";
import styled from 'styled-components';
import Grid from '@mui/material/Grid';


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
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;
