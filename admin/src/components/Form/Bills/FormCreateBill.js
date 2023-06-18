import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { DELETE_PRODUCT_SAGA, GET_ALL_PRODUCT, GET_ALL_PRODUCT_SAGA, INSERT_PRODUCT_SAGA, UPDATE_PRODUCT_SAGA } from '../../../redux/constants/Product/Product';
import { GET_ALL_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';
import { Button, Popover } from 'antd';
import { DELETE_PRODUCT_BILLS, GET_ALL_PRODUCT_BILLS_SAGA, INSERT_BILLS_SAGA, INSERT_NEWPRODUCTBILL_SAGA, INSERT_PRODUCTBILL_SAGA } from '../../../redux/constants/Bills/Bills';
import { GET_ALL_SUPPLIER_SAGA } from '../../../redux/constants/Supplier/Supplier';


function FormCreatedBill(props) {
    const categoriesList = useSelector(state => state.CategoriesReducers.categoriesList);
    const listProductBill = useSelector(state => state.BillReducers.listProductBill);
    const productList = useSelector(state => state.ProductReducers.productList);
    const listSupplier = useSelector(state => state.SupplierReducers.listSupplier);
    console.log('aasd', listProductBill);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    let [state, setState] = useState({

        values: {
            id: '',
            price: 0,
            quantity: 0
        },

    });
    let [stateNewProduct, setStateNewProduct] = useState({

        values: {
            maLoai: 4,
            tenSP: '',
            price:0,
            quantity: 0
        },

    });
    let [stateImage, setStateImage] = useState('');
    const handleChangeProduct = (e) => {
        let { name, value } = e.target;
        let newValues = { ...state.values };
        console.log(state)


        newValues = { ...newValues, [name]: value };
        setState({
            ...state,
            values: newValues,

        })
    }
    const handleChangeNewProduct = (e) => {
        let { name, value } = e.target;
        let newValues = { ...stateNewProduct.values };
        console.log(stateNewProduct)


        newValues = { ...newValues, [name]: value };
        setStateNewProduct({
            ...stateNewProduct,
            values: newValues,

        })
    }


    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleOpenChange1 = (newOpen) => {
        setOpen1(newOpen);
    };
    const handleChangefile = (e) => {
        let file = e.target.files[0]
        
       
       
       setStateImage(file)
        

    }
    const handleApi=()=>{
        const formdata=new FormData();
        formdata.append('file',stateImage,stateImage.name)
        formdata.append('maLoai',stateNewProduct.values.maLoai)
        formdata.append('tenSP',stateNewProduct.values.tenSP)
        formdata.append('price',stateNewProduct.values.price)
        formdata.append('quantity',stateNewProduct.values.quantity)
        
        dispatch({
            type:INSERT_NEWPRODUCTBILL_SAGA,
            newProductModel:formdata
        

         })



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
        dispatch({ type: GET_ALL_PRODUCT_BILLS_SAGA })
        dispatch({ type: GET_ALL_PRODUCT_SAGA,
            filter: {
                keyWord: '',
                filters: ''


            } })


        // //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_CREATE', submitFunction: handleSubmit });
        dispatch({type:GET_ALL_SUPPLIER_SAGA})
        dispatch({ type: GET_ALL_CATEGORIES_SAGA })




    }, [])


    // const handleEditorChange = (content, editor) => {
    //     setFieldValue('description', content)
    // }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                {/* <div className="col-4">

                    // <div className="form-group">
                    //     <p className="font-weight-bold">Project id</p>
                    //     <input value={values.id} disabled className="form-control" name="id" />
                    // </div>


                </div> */}
              


                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Nhà Cung Cấp</p>
                        <select className="form-control" name="supplierId"  onChange={handleChange}>
                            {listSupplier?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            })}
                        </select>



                    </div>
                </div>

                <div className="col-12">

                    <Popover

                        style={{ width: 500 }}
                        placement="left"
                        return
                        content={() => {
                            return <form className="container-fuild" >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <p className="font-weight-bold">Chon San pham</p>
                                            <select className="form-control" name="id" onChange={handleChangeProduct}>
                                                {productList?.map((item, index) => {
                                                    return <option key={index} value={item.id}>
                                                        {item.tenSP}
                                                    </option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <p className="font-weight-bold">So Luong</p>
                                            <input className="form-control" name="quantity" onChange={handleChangeProduct} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <p className="font-weight-bold">Gia</p>
                                            <input className="form-control" name="price" onChange={handleChangeProduct} />
                                        </div>
                                    </div>




                                </div>


                                <Button className="ant-btn-primary" onClick={() => {
                                    dispatch({
                                        type: INSERT_PRODUCTBILL_SAGA,
                                        productModel: {
                                            productId: state.values.id,
                                            quantity: state.values.quantity,
                                            price: state.values.price

                                        }


                                    })

                                }} style={{ marginLeft: '80%', }}>submit</Button>
                            </form>

                        }}
                        overlayStyle={{ width: '500px' }}

                        title="Title"
                        trigger="click"
                        open={open1}
                        onOpenChange={handleOpenChange1}
                    >
                        <Button style={{ marginRight: '30px' }} type="primary">Click me</Button>
                    </Popover>
                    <Popover

                        style={{ width: 500 }}
                        placement="left"
                        return
                        content={() => {
                            return <form className="container-fuild" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <p className="font-weight-bold">Ma Loai</p>
                                            <select className="form-control" name="maLoai"  onChange={handleChangeNewProduct} >
                            {categoriesList?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.tenLoai}
                                </option>
                            })}
                        </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <p className="font-weight-bold">Ten San Pham</p>
                                            <input className="form-control" name="tenSP" onChange={handleChangeNewProduct} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <p className="font-weight-bold">Anh</p>
                                            <input type='file' className="form-control" name="image" onChange={handleChangefile} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <p className="font-weight-bold">Gia</p>
                                            <input className="form-control" name="price" onChange={handleChangeNewProduct} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <p className="font-weight-bold">quantity</p>
                                            <input className="form-control" name="quantity" onChange={handleChangeNewProduct} />
                                        </div>
                                    </div>
                                 


                                </div>


                                <Button className="ant-btn-primary" type='submit' onClick={handleApi} style={{ marginLeft: '80%', }}>submit</Button>
                            </form>

                        }}
                        overlayStyle={{ width: '500px' }}

                        title="Title"
                        trigger="click"

                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Button type="primary">Click me</Button>
                    </Popover>




                    <table className="table" style={{marginBottom:30}}>
                        <thead>
                            <tr>
                                <th>Tên Sản Phẩm</th>
                                <th>Hình Ảnh</th>
                                <th>Số Lượng</th>
                                <th>Giá </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProductBill?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.name}</td>
                                    <td><img src={item.image} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                   
                                    <td>
                                        <span onClick={() => {
                                            dispatch({
                                                type: DELETE_PRODUCT_BILLS,
                                               idProduct:item.id
                                            })

                                        }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</span>
                                    </td>
                                </tr>
                            })}



                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Tổng Tiền</p>
                        <input className="form-control"  value={listProductBill.reduce((tongTien,item,index)=>{
                                        return tongTien+= item.price*item.quantity;
                                    },0).toLocaleString()} name="total" onChange={()=>{
                                        setValues('total')
                                    }} />
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





const CreatedProductForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { listSupplier ,listProductBill} = props

        return {
           
            supplierId:listSupplier[0]?.id,
            total:listProductBill.reduce((tongTien,item,index)=>{
                return tongTien+= item.price*item.quantity;
            },0)
           

        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {

      
        
        props.dispatch({
            type: INSERT_BILLS_SAGA,
            billModel: values
        })
        console.log('Asasa',values)
       

    },
    displayName: '',
})(FormCreatedBill);

const mapStateToProps = (state) => ({

    listSupplier: state.SupplierReducers.listSupplier,
    listProductBill:state.BillReducers.listProductBill
    
    

})



export default connect(mapStateToProps)(CreatedProductForm);