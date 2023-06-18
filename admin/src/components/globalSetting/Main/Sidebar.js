import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export default function Sidebar() {
  return (
   <nav className="sidebar sidebar-offcanvas" id="sidebar">
  <ul className="nav">
    <li className="nav-item">
      <NavLink className="nav-link" to="/">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Trang Chủ</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/categories">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Loại Sản Phẩm</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/products">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Sản Phẩm</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/supplier">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Nhà Cung Cấp</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/customer">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Khách Hàng</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/news">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Tin Tức</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/user">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Nhân Viên</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/bills">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Hóa Đơn Nhập</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/orders">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Hóa Đơn Bán</span>
      </NavLink>
    </li>
  </ul>
</nav>

  )
}
