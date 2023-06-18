import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { GET_ALL_CATEGORIES_SAGA, UPDATE_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';
import { UPDATE_PRODUCT_SAGA } from '../../../redux/constants/Product/Product';
// import { INSERT_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';


function FormEditProduct(props) {
    const categoriesList = useSelector(state => state.CategoriesReducers.categoriesList);
    const dispatch = useDispatch();
    const handleChangefile=(e)=>{
        let file= e.target.files[0]
        setFieldValue('image',file)
    }


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
        dispatch({ type: GET_ALL_CATEGORIES_SAGA })


        // //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_EDIT', submitFunction: handleSubmit });
        



    }, [])


    // const handleEditorChange = (content, editor) => {
    //     setFieldValue('description', content)
    // }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-6">

                <div className="form-group">
                    <p className="font-weight-bold">Ma San Pham</p>
                    <input value={values.id} disabled className="form-control" name="id" />
                </div>


            </div>
            <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Tên Sản Phẩm</p>
                        <input   className="form-control" value={values.tenSP} name="tenSP" onChange={handleChange} {...getFieldProps("tenSP")}/>
                        { errors.tenSP && touched.tenSP && <div className="text-danger">{errors.tenSP }</div>}
                    </div>
                </div>
             
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Ảnh</p>
                        <input type='file'  className="form-control" name="image" onChange={handleChangefile}  />
                        { errors.image && touched.image && <div className="text-danger">{errors.image }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Mã Loại</p>
                        <select className="form-control" name="maLoai" value={values.maLoai} onChange={handleChange} {...getFieldProps("maLoai")}>
                            {categoriesList?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.tenLoai}
                                </option>
                            })}
                        </select>
                        { errors.maLoai && touched.maLoai && <div className="text-danger">{errors.maLoai }</div>}


                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Giá Bán</p>
                        <input  className="form-control" name="giaBan" value={values.giaBan} onChange={handleChange} {...getFieldProps("giaBan")} />
                        { errors.giaBan && touched.giaBan && <div className="text-danger">{errors.giaBan }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Sale</p>
                        <input  className="form-control" name="sale" value={values.sale} onChange={handleChange} {...getFieldProps("sale")}/>
                        { errors.sale && touched.sale && <div className="text-danger">{errors.sale }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Số Lượng</p>
                        <input  className="form-control" name="soLuong" value={values.soLuong} onChange={handleChange} {...getFieldProps("soLuong")}/>
                        { errors.soLuong && touched.soLuong && <div className="text-danger">{errors.soLuong }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Tình Trang</p>
                        <input  className="form-control" name="tinhTrang" value={values.tinhTrang} onChange={handleChange} {...getFieldProps("tinhTrang")} />
                        { errors.tinhTrang && touched.tinhTrang && <div className="text-danger">{errors.tinhTrang }</div>}
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





const EditProductForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {editProduct}=props
       

        return {
            id:editProduct.id,
            tenSP:editProduct.tenSP,
            maLoai: editProduct?.maLoai,
            image:{},
            giaBan:editProduct.giaBan,
            sale:editProduct.sale,
            soLuong:editProduct.soLuong,
            tinhTrang:editProduct.tinhTrang,
            
        }
    },
    validationSchema: Yup.object().shape({
        tenSP:Yup.string().required('không được để trống!'),
        maLoai:Yup.number().required('không được để trống!'),
        image:Yup.string().required('không được để trống!'),
        giaBan:Yup.number().required('không được để trống!').integer('Phải là số nguyên').min(0,'Phải lớn hơn 0'),
        sale:Yup.number().required('không được để trống!').integer('Phải là số nguyên').min(0,'Phải lớn hơn 0'),
        soLuong:Yup.number().required('không được để trống!').integer('Phải là số nguyên').min(0,'Phải lớn hơn 0'),
        tinhTrang:Yup.string().required('không được để trống!'),


    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        let formdata=new FormData();
        for(let key in values){
            if(key!=='image')
            {
                formdata.append(key,values[key])

            }
            else{
                formdata.append('File',values.image,values.image.name)
            }
        }
        //Khi người dùng bấm submit => đưa dữ liệu về backedn thông qua api
        // const action = {
        //     type:'UPDATE_PROJECT_SAGA',
        //     prjectUpdate:values
        // }
        //Gọi saga
        props.dispatch({
            type:UPDATE_PRODUCT_SAGA,
            ProductModel:formdata
        })
        
        
        
    },
    displayName: 'EditProjectForm',
})(FormEditProduct);

// const mapStateToProps = (state) => ({

//     projectEdit: state.ProjectReducer.projectEdit

// })


const mapStateToProps = (state) => ({

    editProduct: state.ProductReducers.editProduct

})



export default connect(mapStateToProps)(EditProductForm);