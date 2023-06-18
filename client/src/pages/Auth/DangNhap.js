import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined,TwitterOutlined } from '@ant-design/icons';
import {withFormik,Formik} from 'formik'
import * as Yup from 'yup';
import {connect} from 'react-redux';


import { AuthAction } from '../../redux/actions/AuthActions';
function DangNhap(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

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
              <h2>Login</h2>
              <p>Chào mừng bạn đã trở lại. Làm ơn nhập tài khoản và mật khẩu để đăng nhập</p>
            </div>
            <div className="login-register-style login-register-pr">
              <form onSubmit={handleSubmit}>
                <div className="login-register-input">
                  <input type="text" onChange={handleChange} name="email" placeholder="Username or email address" />
                  <div className="text-danger">{errors.email}</div>
                </div>
                <div className="login-register-input">
                  <input type="password" onChange={handleChange} name="passWord" placeholder="Password" />
                  <div className="text-danger">{errors.passWord}</div>
                  <div className="forgot">
                    <a><i className="fa fa-eye" /></a>
                  </div>
                </div>
                <div className="remember-me-btn">
                  <input type="checkbox" />
                  <label>Lưu mật khẩu</label>
                </div>
                <div className="btn-style-3">
                  <button className="btn" type="submit">Đăng Nhập</button>
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
const LoginsWithFormik =  withFormik({
    mapPropsToValues: () => ({
        email: '', 
        passWord:''
    }),
    validationSchema: Yup.object().shape({
        email:Yup.string().required('Email is required!').email('email is invalid!'),
        passWord:Yup.string().min(6,'password must have min 6 characters').max(32,'password  have max 32 characters')

    }),
    handleSubmit: ({email,passWord}, {props, setSubmitting }) => {

        

        setSubmitting(true);
        props.dispatch(AuthAction(email,passWord));
        
        // console.log(props)
        // console.log(values);

    },
    displayName: 'Login',
  })(DangNhap);




export default connect ()(LoginsWithFormik);
