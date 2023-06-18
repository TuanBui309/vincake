import React from 'react'
import Body from './components/globalSetting/body/Body.js'
import LoadingComponent from './components/globalSetting/LoadingComponent/LoadingComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../src/page/Login/login.js'
import Drawers from './HOC/Drawer';
import Categories from './page/Categories/Categories.js'
import Product from './page/Products/Product.js'
import Bills from './page/Bills/Bills.js'
import Supplier from './page/Supplier/Supplier.js';
import User from './page/User/User.js';
import Customer from './page/Customer/Customer.js';
import News from './page/News/News.js';
import Statistic from './page/Statistic/Statistic.js';
import Orders from './page/Order/Order.js';

function App() {
  return (
    <div> 
      <LoadingComponent></LoadingComponent>
      <Drawers></Drawers>
      <BrowserRouter>
      <Routes>
      
      <Route exact path='/login' element={<Login />}  />
      <Route element={<Body></Body>}>
          <Route index path='/categories' element={<Categories></Categories>}></Route>
          <Route index path='/products' element={<Product></Product>}></Route>
          <Route index path='/bills' element={<Bills></Bills>}></Route>
          <Route index path='/supplier' element={<Supplier></Supplier>}></Route>
          <Route index path='/User' element={<User></User>}></Route>
          <Route index path='/Customer' element={<Customer></Customer>}></Route>
          <Route index path='/news' element={<News></News>}></Route>
          <Route index path='/' element={<Statistic></Statistic>}></Route>
          <Route index path='/orders' element={<Orders></Orders>}></Route>

         
        </Route>
      </Routes>
    </BrowserRouter>
    
    
    </div>
  
   
  )
}
export default  App
