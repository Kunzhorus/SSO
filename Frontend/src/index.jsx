import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {UserProvider} from "./context/UserContext"
import 'font-awesome/css/font-awesome.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <UserProvider>
    <BrowserRouter>
      <App /> 
    </BrowserRouter> 
  </UserProvider>
  
  
);


