import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { UPDATE_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';
import { UPDATE_NEWS_SAGA } from '../../../redux/constants/News/News';
// import { INSERT_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';


function FormEditedNews(props) {
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
                        <p className="font-weight-bold">Mã Tin Tức</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Nội Dung</p>
                        <input value={values.NoiDung} className="form-control" name="NoiDung" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Ảnh</p>
                        <input type='file'  className="form-control" name="image" onChange={handleChangefile} />
                    </div>
                </div>
              <div className='col-12'>
              <p>Description</p>
                <Editor
                    name="moTa"
                    value={values.MoTa}
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={(content, editor) => {
                            setFieldValue('MoTa',content);
                        }}
                />
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





const EditForms = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {editNews}=props
       

        return {
            id:editNews.id,
            NoiDung: editNews.noiDung,
            image:editNews.image,
            MoTa: editNews.moTa,
            
        }
    },
    validationSchema: Yup.object().shape({


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
            type:UPDATE_NEWS_SAGA,
            newsModel:formdata
        })
        
    },
    displayName: 'EditProjectForm',
})(FormEditedNews);

// const mapStateToProps = (state) => ({

//     projectEdit: state.ProjectReducer.projectEdit

// })


const mapStateToProps = (state) => ({

    editNews: state.NewsReducers.editNews

})



export default connect(mapStateToProps)(EditForms);