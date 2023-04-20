import axios from "axios"

export const login =(username,password)=>{
   return (axios.post("http://localhost:3001/authenticate", {
     username,
     password,
  })
   )
}

export const createProject =(username,password,name,description)=>{
  return (axios.post("http://localhost:3002/createProject", {
    username,
    password,
    name,
    description
 })
  )
}

export const getProject =(username,password)=>{
  return axios.get(`http://localhost:3002/getProject?username=${username}&password=${password}`);
}

export const getUserStory =(username,password,projectName)=>{
  return axios.get(`http://localhost:3003/getUserStory?username=${username}&password=${password}&projectName=${projectName}`);
}

export const createMember =(username,password,member,projectId)=>{
  return (axios.post("http://localhost:3004/createMember", {
    username,
    password,
    member,
    projectId
 })
  )
}

export const getMembers =(username,password,projectId)=>{
  return axios.get(`http://localhost:3004/getMembers?username=${username}&password=${password}&projectId=${projectId}
  `)
}

export const updateUserstory =(username, password, projectname, userstoryname, storypoints)=>{
  return axios.patch(`http://localhost:3003/updateUserstory`, {
    username,
    password,
    projectname,
    userstoryname,
    storypoints
  })
}
export const getRoles =(username,password,projectName)=>{
  return axios.get(`http://localhost:3008/getroles?username=${username}&password=${password}&projectName=${projectName}
  `)
}

export const createRoles =(username,password,roleName,projectName)=>{
  return (axios.post("http://localhost:3008/createRoles", {
    username,
    password,
    roleName,
    projectName
 })
  )
}

export const getStoryTask =(username,password,projectname,userstoryname)=>{
  return (axios.post("http://localhost:3005/getUserStoryTaskDetails", {
    username,
    password,
    projectname,
    userstoryname
 })
  )
}

export const updateTask =(username,password,projectname,userstoryname,taskname,status)=>{
  return (axios.post("http://localhost:3005/updateTask", {
    username,
    password,
    projectname,
    userstoryname,
    taskname,
    status
 })
  )
}

export const createTask =(username,password,projectname,userstoryname,taskname,status)=>{
  return (axios.post("http://localhost:3005/createTask", {
    username,
    password,
    projectname,
    userstoryname,
    taskname
 })
  )
}

export const createRoles = ( username, password, roleName, projectName) => {
  return (axios.post("http://localhost:3008/createroles", {
    username, 
    password, 
    roleName, 
    projectName
  })
  )
}

export const updateRoles = (username, password, roleName, newRoleName, projectName) => {
  return ( axios.patch(`http://localhost:3008/updateroles`, {
    username, 
    password, 
    roleName,
    newRoleName, 
    projectName
  })
  )
}

export const deleteRoles = (username, password, projectName, roleName) => {
  return axios.delete(`http://localhost:3008/deleteroles/:${roleName}?username=${username}&password=${password}&projectName=${projectName}`)
}


