import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { INSERT_CUSTOMER_SAGA } from '../../../redux/constants/Customer/Customer';



function FormCreatedCustomer(props) {
    
    const dispatch = useDispatch();
    

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        getFieldProps,
        setValues,
        setFieldValue,
        ErrorMessage
    } = props;




    useEffect(() => {

        //Gọi api load project category 
        // dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })


        // //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_CREATE', submitFunction: handleSubmit });
        



    }, [])


    // const handleEditorChange = (content, editor) => {
    //     setFieldValue('description', content)
    // }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                {/* <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div> */}
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Emai</p>
                        <input  className="form-control" name="email" onChange={handleChange} {...getFieldProps("email")}  />
                        { errors.email && touched.email && <div className="text-danger">{errors.email }</div>}

                

            
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Mật Khẩu</p>
                        <input   className="form-control" name="passWord" onChange={handleChange}  {...getFieldProps("passWord")} />
                        { errors.passWord && touched.passWord && <div className="text-danger">{errors.passWord }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Tên Khách Hàng</p>
                        <input   className="form-control" name="name" onChange={handleChange} {...getFieldProps("name")}/>
                        { errors.name && touched.name && <div className="text-danger">{errors.name }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Số Điện Thoại</p>
                        <input  className="form-control" name="phoneNumber" onChange={handleChange} {...getFieldProps("phoneNumber")}/>
                        { errors.phoneNumber && touched.phoneNumber && <div className="text-danger">{errors.phoneNumber }</div>}
                    </div>
                </div>
        
              
            </div>
        </form >
    )
}





const CreatedProjectForm = withFormik({
    enableReinitialize: true,
    
    mapPropsToValues: (props) => {
       

        return {
            email: '',
            passWord: '',
            name: '',
            phoneNumber: '',
            
            
        }
    },
    
    validationSchema: Yup.object().shape({
        
        email:Yup.string().required('Email không được để trống!').email('email không hợp lệ!'),
        passWord:Yup.string().min(6,'Mật khẩu không được ít hơn 6 kí tự').max(32,'Mật khẩu không được nhiều hơn 32 kí tự'),
        name:Yup.string().min(6,'Tên phải nhiều hơn 6 kí tự').max(300,'Tên phải ít hơn 300 kí tự').required('Tên không được để trống!'),
        phoneNumber:Yup.string().required('Không được để trống').matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g,'Số điện thoại không hợp lệ')
  
  
    }),
    handleSubmit: (values, { props, setSubmitting }) => {

      
        props.dispatch({
            type:INSERT_CUSTOMER_SAGA,
            customerModel:values
        })
      
    },
  
    displayName: 'Form Created',
})(FormCreatedCustomer);

// const mapStateToProps = (state) => ({

//     projectEdit: state.ProjectReducer.projectEdit

// })



export default connect()(CreatedProjectForm);