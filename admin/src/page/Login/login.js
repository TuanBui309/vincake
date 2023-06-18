
import React from 'react'
import { Button, Input } from 'antd';

import {withFormik,Formik} from 'formik'
import * as Yup from 'yup';
import {connect} from 'react-redux';
import { USER_SIGNIN_API } from '../../redux/constants/User/User';
import { singinAction } from '../../redux/actions/UserAction';
function login(props) {

  
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <div className="container-scroller" >
  <div className="container-fluid page-body-wrapper full-page-wrapper" >
    <div className="content-wrapper d-flex align-items-center auth px-0" style={{ background: "url(/assets/img/backgound.jpg)",backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundAttachment:'fixed' }} >
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src="assets/img/logovincake.png" alt="logo" />
            </div>
           <h4 style={{fontWeight: 600}}>Chào Mừng đã trở lại</h4>


            
            <form onSubmit={handleSubmit}  className="pt-3">
              <div className="form-group">
                <input onChange={handleChange} type="email" name="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                <div className="text-danger">{errors.email}</div>
              </div>
              <div >
               
              </div>
              <div className="form-group">
                <input type="password" onChange={handleChange} name="passWord" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                <div className="text-danger">{errors.passWord}</div>
              </div>
              <div >
                
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-info" data-bs-dismiss="modal">Dang nhap</button>
              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" />
                  </label>
                </div>
                <a href="#" className="auth-link text-black">Quên mật khẩu? </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
const LoginWithFormik =  withFormik({
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
      props.dispatch(singinAction(email,passWord));
      
      // console.log(props)
      // console.log(values);

  },
  displayName: 'Login',
})(login);

export default connect()(LoginWithFormik);