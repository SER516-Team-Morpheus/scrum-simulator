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
        name:'Current Sprint',
        url:'/current-sprint',
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
    // {
    //     name: 'Settings',
    //     url: '/settings',
    //     isVisible:Cookies.get('projectName') ? true : false,
    //     isActive:false
    // },
    {
        name: 'Members',
        url: '/members',
        isVisible:Cookies.get('projectName') ? true : false,
        isActive:false
    },
    {
        name: 'Roles',
        url: '/roles',
        isVisible:Cookies.get('projectName') ? true : false,
        isActive:false
    }
]
)}