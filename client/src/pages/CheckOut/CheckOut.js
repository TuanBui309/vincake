import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { GET_ALL_CART_SAGA } from '../../redux/constants/Cart';
import { Select, Space } from 'antd';

function CheckOut(props) {
  const listCart = useSelector(state => state.CartReducers.listCart)

  const listAddress = useSelector(state => state.HomeReducers.listAddress)
  const listDistrict = useSelector(state => state.HomeReducers.listDistrict)
  const listWard = useSelector(state => state.HomeReducers.listWard)
  const [state, SetState] = useState('');
  const [stateWard, SetStateWard] = useState('');

  const handleChangeCity = (value,options) => {
   
    let cityId =value

    SetState(cityId);
    setFieldValue("city",options.label )
  }
  const handleChangeDistrict = (value,options) => {
   
    let districtId =value

    SetStateWard(districtId);
    setFieldValue("district",options.label )
  }

  
  const handleChangeWard = (value,options) => {
    
    setFieldValue("ward", options.label)




  }


  useEffect(() => {
    dispatch({ type: GET_ALL_CART_SAGA })
    dispatch({
      type: "GET_ALL_ADDRESS_SAGA"
    })
    dispatch({
      type: "GET_ALL_DISTRICT_SAGA"
    })
    dispatch({
      type: "GET_ALL_WARD_SAGA"
    })

  }, [])

  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue
  } = props;
  return (
    <main className="main-content">
      <section className="page-title-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 m-auto">
              <div className="page-title-content text-center">
                <h2 className="title">Checkout</h2>
                <div className="bread-crumbs"><a href="index.html"> Home </a><span className="breadcrumb-sep"> // </span><span className="active"> Checkout</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-area shop-checkout-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="section-title text-center">
                <h2 className="title">Checkout</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="checkout-coupon-wrap mb-65 mb-md-40">
                <p className="cart-page-title"><i className="ion-ios-pricetag-outline" /> Have a coupon? <a className="checkout-coupon-active" href="#/">Click here to enter your code</a></p>
                <div className="checkout-coupon-content">
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-7">
                <div className="billing-info-wrap">
                  <h3>Chi Tiết Hóa Đơn</h3>
                  <div className="row">
                    <div className="col-12">
                      <div className="billing-info mb-20">
                        <label>Tên Khách Hàng </label>
                        <input type="text" name="name" onChange={handleChange} />
                        <div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="billing-info mb-20">
                        <label>Số Điện Thoại </label>
                        <input type="text" name="phone" onChange={handleChange} />
                        <div>

                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="billing-select mb-20">
                        <label>Tỉnh </label>
                        <div className="select-style">
                          <Select
                            defaultValue="Chọn Thành Phố"
                            style={{ width: 670 }}
                            onChange={handleChangeCity}
                            options={listAddress?.map((item, index) => {
                              return { label: item.name, value: item.code }
                          })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="billing-select mb-20">
                        <label>Huyện </label>
                        <div className="select-style">
                        <Select
                            defaultValue="Chọn Huyện"
                            style={{ width: 670 }}
                            onChange={handleChangeDistrict}
                            options={listDistrict.filter(item=>item.province_code===state)?.map((item, index) => {
                              return { label: item.name, value: item.code }
                          })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="billing-select mb-20">
                        <label>Xã <abbr className="required" title="required">*</abbr></label>
                        <div className="select-style">
                        <Select
                            defaultValue="Chọn Xã"
                            style={{ width: 670 }}
                            onChange={handleChangeWard}
                            options={listWard.filter(item=>item.district_code===stateWard)?.map((item, index) => {
                              return { label: item.name, value: item.code }
                          })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="billing-info mb-20">
                        <label>Địa chỉ cụ thể</label>
                        <input type="text" name='address' onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="your-order-area">
                  <h3>Sản Phẩm Đã Thêm</h3>
                  <div className="your-order-wrap">
                    <div className="your-order-info-wrap">
                      <div className="your-order-title">
                        <h4>Sản Phẩm <span>Subtotal</span></h4>
                      </div>
                      <div className="your-order-product">
                        <ul>
                          {listCart.map((item, index) => {
                            return <li key={index}>{item.productcarts.tenSP}<span>{item.subTotal}</span></li>

                          })}

                        </ul>
                      </div>
                  
                      <div className="your-order-total">
                        <h3>Tổng Tiền<span name="total" onChange={()=>{
                                        setValues('total')
                                    }}> {listCart.reduce((tongTien,item,index)=>{
                                        return tongTien+= item.subTotal;
                                    },0).toLocaleString()}</span></h3>
                      </div>
                    </div>
                  </div>
                  <div className="place-order">
                    <button type="submit" style={{ height: 50, width: 200, backgroundColor: 'pink', marginLeft: 170, borderRadius: 2, border: 2 }} className="place-order">Mua hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>

  )
}
const AddOrder = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { listAddress } = props;
    const { listDistrict } = props;
    const { listWard } = props;
    const { listCart } = props;

    return {
      name: "",
      phone: "",
      city: listAddress[0]?.name,
      district: listDistrict[0]?.name,
      ward: listWard[0]?.name,
      address: "",
      total:listCart.reduce((tongTien,item,index)=>{
        return tongTien+= item.subTotal;
    },0)


    }
  },
  validationSchema: Yup.object().shape({


  }),
  handleSubmit: (values, { props, setSubmitting }) => {


    props.dispatch({
      type: "ADD_ORDER_SAGA",
      orderModel: values
    })

    console.log("value", values)

  },
  displayName: '',
})(CheckOut);

const mapStateToProps = (state) => ({

  listAddress: state.HomeReducers.listAddress,
  listDistrict: state.HomeReducers.listDistrict,
  listWard: state.HomeReducers.listWard,
  listCart:state.CartReducers.listCart

})
export default connect(mapStateToProps)(AddOrder);
