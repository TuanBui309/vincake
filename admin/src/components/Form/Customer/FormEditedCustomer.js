import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { UPDATE_CUSTOMER_SAGA } from '../../../redux/constants/Customer/Customer';





function FormEditedCustomer(props) {
    // const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();
  

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue,
        getFieldProps
    } = props;




    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('submit edit');
    // }

    //componentdidmount
    useEffect(() => {

        //Gọi api load project category 
        // dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })


        // //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_EDIT', submitFunction: handleSubmit });
        



    }, [])


    // const handleEditorChange = (content, editor) => {
    //     setFieldValue('description', content)
    // }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Mã Khách Hàng</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Emai</p>
                        <input  className="form-control" value={values.email}  name="email" onChange={handleChange} {...getFieldProps("email")}/>
                        { errors.email && touched.email && <div className="text-danger">{errors.email }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Mật Khẩu</p>
                        <input   className="form-control" value={values.passWord} name="passWord" onChange={handleChange}   />
                       
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Tên Khách Hàng</p>
                        <input   className="form-control" value={values.name} name="name" onChange={handleChange} {...getFieldProps("name")}/>
                        { errors.name && touched.name && <div className="text-danger">{errors.name }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Số Điện Thoại</p>
                        <input  className="form-control" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} {...getFieldProps("phoneNumber")}/>
                        { errors.phoneNumber && touched.phoneNumber && <div className="text-danger">{errors.phoneNumber }</div>}
                    </div>
                </div>
             
                {/* <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select className="form-control" name="categoryId"  onChange={handleChange}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>


                    </div>
                </div> */}
              
            </div>
        </form >
    )
}





const EditForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {editCustomer}=props
       

        return {
            id:editCustomer.userId,
            email: editCustomer.email,
         
            name: editCustomer.name,
            phoneNumber: editCustomer.phoneNumber,
            
        }
    },
    validationSchema: Yup.object().shape({
        
        email:Yup.string().required('Email không được để trống!').email('email không hợp lệ!'),
      
        name:Yup.string().min(6,'Tên phải nhiều hơn 6 kí tự').max(300,'Tên phải ít hơn 300 kí tự').required('Tên không được để trống!'),
        phoneNumber:Yup.string().required('Không được để trống').matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g,'Số điện thoại không hợp lệ')
  
  
    }),
    handleSubmit: (values, { props, setSubmitting }) => {

      
        //Khi người dùng bấm submit => đưa dữ liệu về backedn thông qua api
        // const action = {
        //     type:'UPDATE_PROJECT_SAGA',
        //     prjectUpdate:values
        // }
        //Gọi saga
        props.dispatch({
            type:UPDATE_CUSTOMER_SAGA,
            customerModel:values
        })
        
    },
    displayName: 'EditForm',
})(FormEditedCustomer);

// const mapStateToProps = (state) => ({

//     projectEdit: state.ProjectReducer.projectEdit

// })


const mapStateToProps = (state) => ({

    editCustomer: state.CustomerReducers.editCustomer

})



export default connect(mapStateToProps)(EditForm);