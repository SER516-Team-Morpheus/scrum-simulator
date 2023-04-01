import Cookies from "js-cookie";

export const navItems =()=> {return([
    {
        name:'Projects',
        url:'/projects',
        isVisible:true,
        isActive:false
    },
    {
        name:'Backlog',
        url:'/backlog',
        isVisible:Cookies.get('projectName') ? true : false,
        isActive:false
    },
    {
        name:'Sprints',
        url:'/sprints',
        isVisible:false,
        isActive:false
    },
    {
        name:'Simulation',
        url:'/simulation',
        isVisible:false,
        isActive:false
    }
]
)}