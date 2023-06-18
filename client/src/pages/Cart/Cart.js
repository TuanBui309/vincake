import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_CART_SAGA } from '../../redux/constants/Cart';
import { InputNumber } from 'antd';
import { NavLink } from 'react-router-dom';

export default function Cart() {
    const listCart = useSelector(state => state.CartReducers.listCart)
    console.log("aaaa", listCart)
    const dispatch = useDispatch();
    const onChange = (value) => {
        console.log('changed', value);
      };
    
    const [state, SetListCart] = useState(
       { values:{quantity:listCart.quantity}}
        
      );
      
      
    const change = useRef(null)





    // }
    

    useEffect(() => {
        dispatch({ type: GET_ALL_CART_SAGA })

    }, [])



    return (
        <main className="main-content">
            <section className="page-title-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 m-auto">
                            <div className="page-title-content text-center">
                                <h2 className="title">Cart</h2>
                                <div className="bread-crumbs"><a href="index.html"> Home </a><span className="breadcrumb-sep"> // </span><span className="active"> Cart</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="product-area cart-page-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="section-title text-center">
                                <h2 className="title">Cart</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-lg-12">
                            <div className="cart-table-wrap">
                                <div className="cart-table table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="width-thumbnail" />
                                                <th className="width-name">Product</th>
                                                <th className="width-price"> Price</th>
                                                <th className="width-quantity">Quantity</th>
                                                <th className="width-subtotal">Subtotal</th>
                                                <th className="width-remove" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCart.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="product-thumbnail">
                                                        <a href="shop-single-product.html"><img src={item.productcarts.image} alt="Image" /></a>
                                                    </td>
                                                    <td className="product-name">
                                                        <h5><a href="shop-single-product.html" />{item.productcarts.tenSP}</h5>
                                                    </td>
                                                    <td className="product-price"><span className="amount" />{item.productcarts.giaBan.toLocaleString()}</td>
                                                    <td className="cart-quality">
                                                        <div className="product-details-quality" >

                                                        <InputNumber  min={1}  value={item.quantity} onChange={(value)=>{
                                                             
                                                             if (change.current) {
                                                                clearTimeout(change.current);
                                                            }
                                                            change.current = setTimeout(() => {
                                                                
                                                               
                                                             


                                                                dispatch({
                                                                    type: 'CHANGE_QUANTITY_SAGA',
                                                                    cartModel: {
                                                                        id: item.id,
                                                                        quantity: value
                                                                    }
                                                                })
                                                               
                                                                
                                                               
                                                                






                                                            }, 1)
                                                        }} />
                                                        </div>
                                                    </td>
                                                    <td className="product-total"> {item.subTotal.toLocaleString()}<span> </span></td>
                                                    <td className="product-remove" style={{cursor: 'pointer'}} onClick={()=>{
                                                        dispatch({
                                                            type:'DELETE_CART_SAGA',
                                                            cartId:item.id,
                                                        })
                                                        alert('bạn đang chọn sản phẩm có mã '+item.id)
                                                        console.log('cart id',item.id)
                                                    }}> <i className="ion-ios-trash-outline" /></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="cart-shiping-update-wrapper">
                                <div className="cart-shiping-btn continure-btn">
                                    <a className="btn btn-link" routerlink="/"><i className="ion-ios-arrow-left" /> Trở Về Trang Chủ</a>
                                </div>
                                <div className="cart-shiping-btn update-btn">
                                    <a className="btn btn-link" routerlink="/"><i className="ion-ios-reload" /> Trở Về Trang Chủ</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-4" style={{ marginLeft: 1000 }}>
                            <div className="grand-total-wrap">
                                <div className="grand-total-content">
                                    <div className="grand-shipping">
                                        <span>Shipping</span>
                                        <ul>
                                            <li><input type="radio" name="shipping" defaultValue="info" defaultChecked="checked" /><label>Miễn Phí Vận Chuyển</label></li>
                                        </ul>
                                    </div>
                                    <div className="grand-total">
                                        {}
                                        <h4>Tổng Tiền<span />{listCart.reduce((tongTien,item,index)=>{
                                        return tongTien+= item.subTotal;
                                    },0).toLocaleString()}</h4>
                                    </div>
                                </div>
                                <div className="grand-total-btn">
                                    <NavLink to={'/checkout'} className="btn btn-link">Tiến hành thanh toán</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>


    )
}
