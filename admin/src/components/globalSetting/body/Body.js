
import React from 'react'
import Header from '../Main/Header'
import Sidebar from '../Main/Sidebar'
import Content from '../Main/Content'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import FormCreated from '../../Form/Categories/FormCreated'



export default function Body() {
  const dispatch=useDispatch();
  
  
  if(localStorage.getItem('USER_LOGIN'))
  {
    return (
      <div className="container-scroller">
    <Header />
    <div className="container-fluid page-body-wrapper" >
      <Sidebar />
      <Outlet></Outlet>
    </div>
  </div>
    )
  }
  else{
    window.location.replace('/login')


  }

  
}
