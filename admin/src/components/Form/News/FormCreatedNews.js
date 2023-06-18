import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { INSERT_NEWS_SAGA } from '../../../redux/constants/News/News';




function FormCreatedNews(props) {
    // const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();
    const handleChangefile=(e)=>{
        let file= e.target.files[0]
        setFieldValue('image',file)
        console.log(file)
    }


    const {
        values,
        touched,
        errors,
        handleChange,
        getFieldProps,
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
                        <p className="font-weight-bold">Nội Dung</p>
                        <input  className="form-control" name="NoiDung" onChange={handleChange}  {...getFieldProps("NoiDung")}/>
                        { errors.NoiDung && touched.NoiDung && <div className="text-danger">{errors.NoiDung }</div>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Ảnh</p>
                        <input type='file'  className="form-control" name="image" onChange={handleChangefile} />
                        { errors.image && touched.image && <div className="text-danger">{errors.image }</div>}
                    </div>
                </div>
              <div className='col-12'>
              <p>Description</p>
                <Editor
                    name="MoTa"
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
                  { errors.MoTa && touched.MoTa && <div className="text-danger">{errors.MoTa }</div>}
              </div>
            </div>
        </form >
    )
}





const CreatedForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
       

        return {
            NoiDung:'',
            image:{},
            MoTa:'',
            
        }
    },
    validationSchema: Yup.object().shape({
        NoiDung:Yup.string().required('Nội dung  không được để trống!'),
        image:Yup.string().required('Ảnh không được để trống!'),
        MoTa:Yup.string().required('Mô tả không được để trống!'),
        
      
  
    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        let formdata=new FormData();
        for(let key in values){
            if(key!=='image')
            {
                formdata.append(key,values[key])

            }
            else{
                formdata.append('File',values.image)
            }
        }
        //Khi người dùng bấm submit => đưa dữ liệu về backedn thông qua api
        // const action = {
        //     type:'UPDATE_PROJECT_SAGA',
        //     prjectUpdate:values
        // }
        //Gọi saga
        props.dispatch({
            type:INSERT_NEWS_SAGA,
            newsModel:formdata
        })
        console.log('file', formdata.get('File'))
    },
    displayName: 'EditProjectForm',
})(FormCreatedNews);

// const mapStateToProps = (state) => ({

//     projectEdit: state.ProjectReducer.projectEdit

// })



export default connect()(CreatedForm);