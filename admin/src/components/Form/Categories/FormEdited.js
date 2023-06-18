import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { UPDATE_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';
// import { INSERT_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';


function FormEditProject(props) {
    // const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
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
        setFieldValue
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
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />

                    </div>


                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Ten Loai</p>
                        <input value={values.tenLoai}  className="form-control" name="tenLoai" onChange={handleChange} />
                        <div className="text-danger">{errors.tenLoai}</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Anh</p>
                        <input type='file' className="form-control" name="image" onChange={handleChangefile} />
                        <div className="text-danger">{errors.image}</div>
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





const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {editCategories}=props
       

        return {
            id:editCategories.id,
            tenLoai: editCategories.tenLoai,
            image:{},
            
        }
    },
    validationSchema: Yup.object().shape({
        tenLoai:Yup.string().required('Tên Loại Không Được Để trống!'),
        image:Yup.string().required('Ảnh không được để trống')
  
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
            type:UPDATE_CATEGORIES_SAGA,
            Categories:formdata
        })
        
    },
    displayName: 'EditProjectForm',
})(FormEditProject);

// const mapStateToProps = (state) => ({

//     projectEdit: state.ProjectReducer.projectEdit

// })


const mapStateToProps = (state) => ({

    editCategories: state.CategoriesReducers.editCategories

})



export default connect(mapStateToProps)(EditProjectForm);