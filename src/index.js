import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/home/home";
import Login from "./components/Login/Login";
import Search from "./components/Search/Search";
import Hashtag from "./components/Hashtag/Hashtag";
import Users from "./components/Users/Users";
import Accounts from "./components/Accounts/Accounts";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';


const router = createBrowserRouter([
  {
    path:"/",
    element: <Search/>
  },
  {
    path:"/Login",
    element: <Login/>
  },
  {
    path:"/Hashtag",
    element: <Hashtag/>
  },
  {
    path:"/Search",
    element: <Search/>
  },
  {
    path:"/Users",
    element: <Users/>
  },
  {
    path:"/Accounts",
    element: <Accounts/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
