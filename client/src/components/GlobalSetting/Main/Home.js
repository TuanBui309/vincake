import React from 'react'
import Header from '../Layout/Header'
import Content from '../Layout/Content'
import Footer from '../Layout/Footer'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
<div>
<div className="wrapper home-default-wrapper">
  <Header></Header>
  <Outlet></Outlet>
  <Footer></Footer>
 
</div>
<div>
 
</div>

</div>

 


  )
}
