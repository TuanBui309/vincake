import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined,TwitterOutlined } from '@ant-design/icons';
import {withFormik,Formik} from 'formik'
import * as Yup from 'yup';
import {connect, useDispatch} from 'react-redux';


import { AuthAction } from '../../redux/actions/AuthActions';
import { CUSTOMER_SIGNIUP_SAGA, FORGET_PASSWORD_SAGA } from '../../redux/constants/Customer';
function ForgetPassword(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      const dispatch=useDispatch();

  return (
    <main className="main-content">
  <section className="page-title-area">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12 m-auto">
          <div className="page-title-content text-center">
            <h2 className="title">Tài Khoản</h2>
            <div className="bread-crumbs"><a href="index.html"> Home </a><span className="breadcrumb-sep"> // </span><span className="active"> Tài Khoản</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="login-register-area">
    <div className="container">
      <div className="row">
        <div className="col-md-5 " style={{margin: 'auto'}}>
          <div className="login-register-content">
            <div className="login-register-title mb-30">
              <h2>Quên Mật Khẩu</h2>
              <p>Chào mừng bạn đã trở lại.</p>
            </div>
            <div className="login-register-style login-register-pr">
              <form onSubmit={handleSubmit}>
                <div className="login-register-input">
                  <input type="text" onChange={handleChange} name="email" placeholder="Username or email address" />
                  <div className="text-danger">{errors.email}</div>
                </div>
               
                <div className="remember-me-btn">
                  <input type="checkbox" />
                  <label>Lưu mật khẩu</label>
                </div>
                <div className="btn-style-3">
                  <button className="btn" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

  )
}
const ForgetPasswordsWithFormik =  withFormik({
    mapPropsToValues: () => ({
        email: '', 
       
    }),
    validationSchema: Yup.object().shape({
        email:Yup.string().required('Email không hợp lệ!').email('Email không hợp lệ!'),
        passWord:Yup.string().min(6,'mật khẩu tối thiểu 6 kí tự').max(32,'mật khậu tối đa 32 kí tự')

    }),
    handleSubmit: (values, {props, setSubmitting }) => {

        

        setSubmitting(true);
        
        
        props.dispatch({
            type:FORGET_PASSWORD_SAGA,
            customerModel:values
        })

    },
    displayName: 'Login',
  })(ForgetPassword);




export default connect ()(ForgetPasswordsWithFormik);
