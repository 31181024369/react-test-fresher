import React, { useState } from 'react';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import Contact from './pages/contact';
import Footed from './components/footed';
import Header from './components/header';
import Home from './components/home';
import RegisterPage from './pages/register';
const Layout=()=>{
  return (
    <div className='layout-app'>
      <Header></Header>
      <Outlet />
      <Footed></Footed>
    </div>
  )
}
export default function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <div>404 not found</div>,
    children: [
      {
        path: "contacts",
        element: <Contact />,
      },
     { index: true, element: <Home /> },
    ],
  },
   {
    path: "/login",
    element: <LoginPage></LoginPage>,
    //RegisterPage
  },
   {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
    //RegisterPage
  },
  ]);
  return (
     <RouterProvider router={router} />
  )
}
