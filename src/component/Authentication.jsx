import React from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

const Authentication = ({ children }) => {
    
    if (!(Cookies.get('token'))) {
      redirect("/")
    }
    return children;
 };

 export default Authentication;