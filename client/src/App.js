import React from 'react'
import Home from './components/GlobalSetting/Main/Home'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Slide from './components/GlobalSetting/Layout/Slide'
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import TrangChu from './pages/TrangChu/TrangChu';
import ChiTiet from './pages/ChiTienSanPham/ChiTietSanPham';
import DangNhap from './pages/Auth/DangNhap';
import Cart from './pages/Cart/Cart';
import CheckOut from './pages/CheckOut/CheckOut';
import SanPham from './pages/SanPham/SanPham';
import TinTuc from './pages/TinTuc/TinTuc';
import ChiTietTinTuc from './pages/TinTuc/ChiTietTinTuc';
import LichSuMuaHang from './pages/History/LichSuMuaHang';
import DangKi from './pages/Auth/DangKi';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import TrangCaNhan from './pages/Auth/TrangCaNhan';


export default function App() {
  return (

    <div>
      <BrowserRouter>
        
        <LoadingComponent />
        
        <Routes>
         
         


          <Route element={<Home></Home>}>
            <Route index path='/' element={<TrangChu></TrangChu>}></Route>
            <Route index path='/chitietsanpham/:productId' element={<ChiTiet></ChiTiet>}></Route>
            <Route index path='/sanpham/:categoryId' element={< SanPham></SanPham>}></Route>
            <Route index path='/dangnhap' element={<DangNhap></DangNhap>}></Route>
            <Route index path='/cart' element={<Cart></Cart>}></Route>
            <Route index path='/checkout' element={<CheckOut></CheckOut>}></Route>
            <Route index path='/tintuc' element={<TinTuc></TinTuc>}></Route>
            <Route index path='/chitiettintuc/:newsId' element={<ChiTietTinTuc></ChiTietTinTuc>}></Route>
            <Route index path='/lichsu' element={<LichSuMuaHang></LichSuMuaHang>}></Route>
            <Route index path='/dangki' element={<DangKi></DangKi>}></Route>
            <Route index path='/forgetpassword' element={<ForgetPassword></ForgetPassword>}></Route>
            <Route index path='/resetpassword' element={<ResetPassword></ResetPassword>}></Route>
            <Route index path='/trangcanhan' element={<TrangCaNhan></TrangCaNhan>}></Route>


          
          </Route>




        </Routes>

      </BrowserRouter>
    </div>
  )
}
