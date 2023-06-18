import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { UPDATE_SUPPLIER_SAGA } from '../../../redux/constants/Supplier/Supplier';

// import { INSERT_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';


function FormEditSupplier(props) {
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
                        <p className="font-weight-bold">Ma Nha Cung Cap</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Ten Nha Cung Cap</p>
                        <input  className="form-control" value={values.name}  name="name" onChange={handleChange} {...getFieldProps("name")}/>
                        { errors.name && touched.name && <div className="text-danger">{errors.name }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">So Dien Thoai</p>
                        <input type='text' value={values.phone}  className="form-control" name="phone" onChange={handleChange} {...getFieldProps("phone")}/>
                        { errors.phone && touched.phone && <div className="text-danger">{errors.phone }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Dia Chi</p>
                        <input type='text' value={values.address} className="form-control" name="address" onChange={handleChange} {...getFieldProps("address")}/>
                        { errors.address && touched.address && <div className="text-danger">{errors.address }</div>}
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





const EditSupplierForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {editSupplier}=props
       

        return {
            id:editSupplier.id,
            name: editSupplier.name,
            address: editSupplier.address,
            phone: editSupplier.phone,
            
            
        }
    },
    validationSchema: Yup.object().shape({
        
       
      
        name:Yup.string().min(6,'Tên phải nhiều hơn 6 kí tự').max(300,'Tên phải ít hơn 300 kí tự').required('Tên không được để trống!'),
        phone:Yup.string().required('Không được để trống').matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g,'Số điện thoại không hợp lệ'),
        address:Yup.string().required('không được để trống!'),
  
  
    }),
    handleSubmit: (values, { props, setSubmitting }) => {

    
        props.dispatch({
            type:UPDATE_SUPPLIER_SAGA,
            supplierModel:values
        })
        
    },
    displayName: 'EditProjectForm',
})(FormEditSupplier);

// const mapStateToProps = (state) => ({

//     projectEdit: state.ProjectReducer.projectEdit

// })


const mapStateToProps = (state) => ({

    editSupplier: state.SupplierReducers.editSupplier

})



export default connect(mapStateToProps)(EditSupplierForm);