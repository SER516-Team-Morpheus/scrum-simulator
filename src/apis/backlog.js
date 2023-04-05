import axios from "axios"

export const createUserstory =(username,password,projectName,subject)=>{
   return (axios.post("http://localhost:3003/createUserstory", {
     username,
     password,
     projectName,
     subject
  })
   )
}