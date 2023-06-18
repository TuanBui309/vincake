import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {withFormik,Formik} from 'formik'
import * as Yup from 'yup';
import { GET_USER_BY_ID, GET_USER_BY_ID_SAGA } from '../../redux/constants/Customer';
function TrangCaNhan(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      const dispatch=useDispatch();
      const userLogin=useSelector(state=>state.AuthReducers.userLogin)
    const listUser=useSelector(state=>state.AuthReducers.listUser)
    console.log(userLogin.id)
    useEffect(() => {
     
      dispatch({
          type:GET_USER_BY_ID_SAGA,
          idUser:userLogin.id
      })
    
      

  }, [])

  return (
   <main className="main-content">
  {/*== Start Page Title Area ==*/}
  <section className="page-title-area">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12 m-auto">
          <div className="page-title-content text-center">
            <h2 className="title">My Account</h2>
            <div className="bread-crumbs"><a href="index.html"> Home </a><span className="breadcrumb-sep"> // </span><span className="active"> My Account</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*== End Page Title Area ==*/}
  {/*== Start My Account Wrapper ==*/}
  <section className="my-account-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 m-auto">
          <div className="section-title text-center">
            <h2 className="title">My account</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="myaccount-page-wrapper">
            <div className="row">
              
              <div className="col-lg-12">
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="dashboad" role="tabpanel" aria-labelledby="dashboad-tab">
                    <div className="myaccount-content">
                      <h3>Dashboard</h3>
                      <div className="welcome">
                        <p>Xin Chào, <strong>Alex Tuntuni</strong> (If Not <strong>Tuntuni !</strong><a href="login-register.html" className="logout"> Logout</a>)</p>
                      </div>
                      <p className="mb-0">From your account dashboard. you can easily check &amp; view your recent orders, manage your shipping and billing addresses and edit your password and account details.</p>
                    </div>
                  </div>
              
                
                  <div className="tab-pane fade active show" id="account-info" role="tabpanel" aria-labelledby="account-info-tab">
                    <div className="myaccount-content">
                      <h3>Account Details</h3>
                      <div className="account-details-form">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                          <div className="col-lg-6">
                              <div className="single-input-item">
                                <label  className="required">Tên Khách Hàng</label>
                                <input type="text" value={values.id} name="id" onChange={handleChange} />
                              </div>
                            </div>
                          
                            <div className="col-lg-6">
                              <div className="single-input-item">
                                <label  className="required">Tên Khách Hàng</label>
                                <input type="text" value={values.name} name="name" onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="single-input-item">
                                <label className="required">Số điện thoại</label>
                                <input type="text" value={values.phoneNumber} name="phoneNumber" onChange={handleChange}  />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="single-input-item">
                                <label  className="required">Email</label>
                                <input type="text" value={values.email}  name="Email" onChange={handleChange} />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="single-input-item">
                                <label className="required">Mật Khẩu</label>
                                <input value={values.passWord} type="text" name="passWord" onChange={handleChange} />
                              </div>
                            </div>
                           
                            
                          </div>
                        
                          
                          <div className="single-input-item">
                            <button  className="check-btn sqr-btn">Save Changes</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*== End My Account Wrapper ==*/}
</main>

  )
}
const EditsWithFormik =  withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {listUser}=props
        return {
            id:listUser.userId,
            email: listUser.email, 
            passWord:'',
            name:listUser.name,
            phoneNumber:listUser.phoneNumber,

        }
    },
    validationSchema: Yup.object().shape({
        email:Yup.string().required('Email không hợp lệ!').email('Email không hợp lệ!'),
        passWord:Yup.string().min(6,'mật khẩu tối thiểu 6 kí tự').max(32,'mật khậu tối đa 32 kí tự')

    }),
    handleSubmit: (values, {props, setSubmitting }) => {

        

        setSubmitting(true);
        
        
        props.dispatch({
            type:'EDIT_CUSTOMER_SAGA',
            customerModel:values
        })
        console.log(values)
        
    },
    displayName: 'Login',
  })(TrangCaNhan);

const mapStateToProps = (state) => ({

    listUser: state.AuthReducers.listUser

})


export default connect (mapStateToProps)(EditsWithFormik);
