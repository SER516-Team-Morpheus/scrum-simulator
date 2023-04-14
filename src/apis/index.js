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

export const getRoles =(username,password,projectName)=>{
  return axios.get(`http://localhost:3008/getroles?username=${username}&password=${password}&projectName=${projectName}
  `)
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



