import Cookies from "js-cookie";

export const navItems =()=> {return([
    {
        name:'Projects',
        url:'/projects',
        isVisible:true,
        isActive:false
    },
    {
    
        name: 'Epics',
        url: '/create-epic',
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
        isVisible:Cookies.get('projectName') ? true : false,
        isActive:false
    },
    {
        name:'Simulation',
        url:'/simulation',
        isVisible:Cookies.get('projectName') ? true : false,
        isActive:false
    },
    {
        name: 'Settings',
        url: '/settings',
        isVisible:Cookies.get('projectName') ? true : false,
        isActive:false
    }
]
)}