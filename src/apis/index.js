import axios from "axios"

export const login =(username,password)=>{
   return (axios.post("http://localhost:8080/authenticate", {
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