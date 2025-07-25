import React, { useEffect, useState } from 'react';

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
import { callFetchAccount } from './services/api';
import { useSelector, useDispatch } from 'react-redux'
import { doGetAccountAction } from './redux/account/accountSlice';
import NotFound from './components/notfound';
import Loading from './components/loading';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutAdmin from './components/admin/LayoutAdmin';
import ManageUser from './pages/admin/user';

const Layout=()=>{
  return (
    <div className='layout-app'>
      <Header></Header>
      <Outlet />
      <Footed></Footed>
    </div>
  )
}
// const LayoutAdmin=()=>{
//   const isAdminRoute=window.location.pathname.startsWith('/admin');
//   const user=useSelector(state=>state.account.user);
//   const userRole=user.role.name;
//   // console.log("data userRole:",userRole);
//   console.log("data admin Role:",userRole);
//   return (
//     <>
//      {isAdminRoute && userRole ==='SUPER_ADMIN' && <Header></Header>}
//       <Outlet />
//      {isAdminRoute && userRole ==='SUPER_ADMIN' && <Header></Header>}
//     </>
//   )
// }
export default function App() {
  const dispatch=useDispatch();
  const isAuthenticated=useSelector(state=>state.account.isAuthenticated);
  const isLoading=useSelector(state=>state.account.isLoading);
  const getAccount=async()=>{
    if(window.location.pathname==='/login'
      || window.location.pathname==='/register'
    ) return;
    const res=await callFetchAccount();
    if(res && res.data){
      dispatch(doGetAccountAction(res.data.user));
      console.log("data fetch data:",res.data.user);
    }
   
  }
  useEffect(()=>{
    getAccount();
  },[])
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "contacts",
        element: <Contact />,
      },
     { index: true, element: <Home /> },
    ],
  },
   {
    path: "/admin",
    element:<LayoutAdmin></LayoutAdmin>,
    errorElement: <NotFound></NotFound>,
    children: [
      
     { index: true, element:
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
     },
     {
        path: "user",
        element: <ManageUser />,
      },
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
    <>
    {/* <RouterProvider router={router} /> */}
    {isLoading===false || window.location.pathname==='/login'
    ||window.location.pathname==='/register'
    || window.location.pathname==='/'
     ?
        <RouterProvider router={router} />
       :
       <Loading></Loading>
    }
    </>

  )
}
