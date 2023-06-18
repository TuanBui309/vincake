import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AutoComplete } from 'antd';
import { GET_ALL_CATEGORIES_SAGA, GET_ALL_PRODUCTS_SAGA } from '../../../redux/constants/Home';
import { USER_LOGIN } from '../../../util/constants/settingSystem';
import { Button, Drawer } from 'antd';
import { GET_ALL_CART_SAGA } from '../../../redux/constants/Cart';

export default function Header() {
  const userLogin = useSelector(state => state.AuthReducers.userLogin)
  const [value, setValue] = useState('');
  const searchRef = useRef(null);
  const productsList = useSelector(state => state.HomeReducers.productsList);
  const dispatch = useDispatch();
  const categoriesList = useSelector(state => state.HomeReducers.categoriesList);
  const [open, setOpen] = useState(false);
  const listCart = useSelector(state => state.CartReducers.listCart)
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch({ type: GET_ALL_CATEGORIES_SAGA })
    dispatch({ type: GET_ALL_CART_SAGA })

    dispatch({
      type: GET_ALL_PRODUCTS_SAGA,

      filter: {
        keyWord: "",
        filters: ""

      }
    })



  }, [])

  //Sử dụng useDispatch để gọi action

  return (
    <header className="header-wrapper">
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-4 col-lg-6">
              <div className="header-info-left">
                <p>Free Returns and Free Shipping</p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-8 col-lg-6 sm-pl-0 xs-pl-15 header-top-right">
              <div className="header-info">
                <a href="tel://035236872"><i className="fa fa-phone" /> 035236872</a>
                <a href="mailto://demo@example.com"><i className="fa fa-envelope" /> kid3092001@gmail.com</a>
                <span style={{
                  cursor: 'pointer', borderLeft: '1px solid #cdcdcd',
                  color: '#404041',
                  marginLeft: '19px',
                  paddingLeft: '20px'
                }}>


                  <div style={{ marginBottom: 10 }}>
                    {!localStorage.getItem(USER_LOGIN) ? (<li style={{ listStyle: 'none' }} className="has-submenu active">
                      <i style={{ width: 20, height: 20, top: 6, float: 'left' }} className="fa fa-user has-submenu" /><div style={{ paddingTop: 6, float: 'left' }}>Account</div>
                      <ul className="submenu-nav">
                        <li style={{ marginLeft: 20 }}><NavLink to={'/dangnhap'} style={{ cursor: 'pointer' }} >Đăng Nhập</NavLink></li>
                        <li style={{ marginLeft: 20 }}><NavLink to={'/dangki'} style={{ cursor: 'pointer' }} >Đăng kí</NavLink></li>
                      </ul>
                    </li>) : (<li style={{ listStyle: 'none' }} className="has-submenu active">
                      <i style={{ width: 20, height: 20, top: 3 }}><img style={{ width: 40, height: 40, borderRadius: 20 }} src={userLogin.avatar} alt='' /></i>{userLogin.name}
                      <ul className="submenu-nav">
                        <li style={{ marginLeft: 20 }}><NavLink to={'/lichsu'} style={{ cursor: 'pointer' }}>Lịch sử mua hàng</NavLink></li>
                        <li style={{ marginLeft: 20 }}><NavLink to={`/forgetpassword`} style={{ cursor: 'pointer' }}  >Quên mật khẩu</NavLink></li>
                        <li style={{ marginLeft: 20, cursor: 'pointer' }} onClick={() => {
                          localStorage.clear('ACCESSTOKEN')
                          localStorage.clear('USER_LOGIN')
                          window.location.replace('/dangnhap')
                        }}> Đăng xuất</li>
                      </ul>
                    </li>)}


                  </div>




                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-middle">
        <div className="container">
          <div className="row row-gutter-0 align-items-center">
            <div className="col-12">
              <div className="header-align">
                <div className="header-align-left">
                  <div className="header-logo-area">
                    <a href="index.html">
                      <img className="logo-main" src="/assets/img/logovincake.png" alt="Logo" />
                      <img className="logo-light" src="/assets/img/logovincake.png" alt="Logo" />
                    </a>
                  </div>
                </div>
                <div className="header-align-center">
                  <div className="header-search-box">
                    <form action="#" method="post">
                      <div className="form-input-item">
                        <label htmlFor="search" className="sr-only">Search Everything</label>
                        <input type="text" id="search" placeholder="Search Everything" />
                        <button type="submit" className="btn-src">
                          <i className="pe-7s-search" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="header-align-right">
                  <div className="header-action-area">
                    <div className="header-action-wishlist">
                      <button className="btn-wishlist" >
                        <i className="pe-7s-like" />
                      </button>
                    </div>
                    <div className="header-action-cart">

                      <button onClick={showDrawer} className="btn-cart cart-icon">
                        <span className="cart-count">01</span>
                        <i className="pe-7s-shopbag" />
                      </button>
                    </div>
                    <button className="btn-menu d-md-none">
                      <i className="fa fa-bars" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-area header-default sticky-header">
        <div className="container">
          <div className="row row-gutter-0 align-items-center">
            <div className="col-4 col-sm-6 col-lg-2">
              <div className="header-logo-area">
                <a href="index.html">
                  <img className="logo-main" src="/assets/img/logovincake.png" alt="Logo" />
                  <img className="logo-light" src="/assets/img/logovincake.png" alt="Logo" />
                </a>
              </div>
            </div>
            <div className="col-lg-8 sticky-md-none">
              <div className="header-navigation-area d-none d-md-block">
                <ul className="main-menu nav position-relative">
                  <li ><NavLink className="nav-link" to="/">Trang Chủ</NavLink>

                  </li>

                  <li className="has-submenu"><NavLink className="nav-link" to="/sanpham">Sản Phẩm</NavLink>
                    <ul className="submenu-nav">
                      {categoriesList.map((item, index) => {
                        return <li key={index}><Link to={`/sanpham/${item.id}`} onClick={() => {
                          dispatch({
                            type: GET_ALL_PRODUCTS_SAGA,
                            filter: {
                              keyWord: item.id,
                              filters: ''
                            }
                          });
                        }} className="nav-link" >{item.tenLoai}</Link></li>
                      })}

                    </ul>
                  </li>
                  <li><NavLink className="nav-link" to="/cart">giỏ Hàng</NavLink>

                  </li>
                  <li ><NavLink className="nav-link" to="/tintuc">Tin Tức</NavLink>

                  </li>
                  <li><NavLink className="nav-link" to="/cart">Giới Thiệu</NavLink></li>
                </ul>
              </div>
            </div>
            <div className="col-8 col-sm-6 col-lg-2">
              <div className="header-action-area">
                <div className="header-action-search">
                  <button className="btn-search btn-search-menu">
                    <AutoComplete
                      popupClassName="certain-category-search-dropdown"
                      dropdownMatchSelectWidth={500}
                      style={{ width: 250, alignItems: 'center' }}
                      options={productsList?.map((user, index) => {
                        return { label: user.tenSP, value: user.id.toString() }
                      })}
                      value={value}

                      onChange={(text) => {
                        setValue(text);
                      }}
                      onSelect={(valueSelect, option) => {
                        //set giá trị của hộp thọa = option.label
                        setValue(option.label);
                        dispatch({
                          type: GET_ALL_PRODUCTS_SAGA,
                          filter: {
                            keyWord: option.label,
                            filters: ""
                          }
                        })


                      }}

                      onSearch={(value) => {

                        if (searchRef.current) {
                          clearTimeout(searchRef.current);
                        }
                        searchRef.current = setTimeout(() => {
                          dispatch({
                            type: GET_ALL_PRODUCTS_SAGA,
                            filter: {
                              keyWord: value,
                              filters: ''


                            }

                          })

                        }, 300)

                      }}






                    >



                    </AutoComplete>
                  </button>
                </div>
                <div className="header-action-login">
                  <button className="btn-login" >
                    <i className="pe-7s-users" />
                  </button>
                </div>
                <div className="header-action-wishlist">
                  <button className="btn-wishlist" >
                    <i className="pe-7s-like" />
                  </button>
                </div>
                <div className="header-action-cart">
                  <button onClick={showDrawer} className="btn-cart cart-icon">
                    <span className="cart-count">01</span>
                    <i className="pe-7s-shopbag" />
                  </button>
                </div>
                <button className="btn-menu d-lg-none">
                  <i className="fa fa-bars" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <div className="cart-content cart-content-padding">
          <ul>
           {listCart.map((item,index)=>{
            return  <li className="single-product-cart">
            <div className="cart-img">
              <a href="shop-single-product.html"><img src={item.productcarts.image} alt='' /></a>
            </div>
            <div className="cart-title">
              <h4><a href="shop-single-product.html">{item.productcarts.tenSP}</a></h4>
              <span> {item.quantity} × <span className="price"> {item.productcarts.sale} </span></span>
            </div>
            <div className="cart-delete">
              <span style={{cursor: 'pointer'}} onClick={()=>{
                                                        dispatch({
                                                            type:'DELETE_CART_SAGA',
                                                            cartId:item.id,
                                                        })
                                                        alert('bạn đang chọn sản phẩm có mã '+item.id)
                                                        console.log('cart id',item.id)
                                                    }}><i className="pe-7s-trash icons" /></span>
            </div>
          </li>
           })}
           
          </ul>
          <div className="cart-total">
            <h4>Subtotal: <span>{listCart.reduce((tongTien,item,index)=>{
                                        return tongTien+= item.subTotal;
                                    },0).toLocaleString()}</span></h4>
          </div>
          <div className="cart-checkout-btn">
            <NavLink to={'/cart'} className="cart-btn" >view cart</NavLink>
            <NavLink to={'/checkout'} className="checkout-btn">checkout</NavLink>
          </div>
        </div>

      </Drawer>
    </header>

  )
}
