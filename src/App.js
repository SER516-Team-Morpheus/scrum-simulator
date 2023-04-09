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
import SimulatorGame from "./component/SimulatorGame";
import StoryDetails from "./component/StoryDetails";

const Wrapper = styled.div`
margin:0px;
padding:0px;


`;

const App = () => {
  const [itemVisible, setItemVisible]=useState(false);
  
  const showItem = ()=>{
    setItemVisible(true);
  }
  
  useEffect(()=>{
    if(Cookies.get('projectName')){
        setItemVisible(true);
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
              <Route exact path="/backlog" element={<Backlog showItem={showItem}/>} />
              <Route exact path="/simulation" element={<SimulatorGame/>} />
              <Route exact path="/storyDetails/:name" element={<StoryDetails/>} />
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;
