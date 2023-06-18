import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { DELETE_PRODUCT_SAGA, GET_ALL_PRODUCT, GET_ALL_PRODUCT_SAGA, INSERT_PRODUCT_SAGA, UPDATE_PRODUCT_SAGA } from '../../../redux/constants/Product/Product';
import { GET_ALL_CATEGORIES_SAGA } from '../../../redux/constants/Categories/Categories';
import { Button, Popover } from 'antd';
import { DELETE_PRODUCT_BILLS, GET_ALL_PRODUCT_BILLS_SAGA, GET_DETAIL_BILL_BY_ID, INSERT_BILLS_SAGA, INSERT_NEWPRODUCTBILL_SAGA, INSERT_PRODUCTBILL_SAGA, UPDATE_BILL_SAGA } from '../../../redux/constants/Bills/Bills';
import { GET_ALL_SUPPLIER_SAGA } from '../../../redux/constants/Supplier/Supplier';
import { UPDATE_ORDER_SAGA } from '../../../redux/constants/Order/Order';


function FormEditedOrder(props) {

    
    const listStatus = useSelector(state => state.StatusOrderReducers.listStatus);
   
    console.log('aasd', listStatus);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);





    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleOpenChange1 = (newOpen) => {
        setOpen1(newOpen);
    };




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

        dispatch({ type: 'GET_ALL_STATUS_ORDER_SAGA' })


        // //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_CREATE', submitFunction: handleSubmit });




    }, [])


    // const handleEditorChange = (content, editor) => {
    //     setFieldValue('description', content)
    // }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Mã Hóa Đơn Bán</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Tên Người Nhận</p>
                        <input value={values.name} disabled className="form-control" name="name" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Số Điện Thoại Người Nhận</p>
                        <input value={values.address} disabled className="form-control" name="address" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Địa Chỉ</p>
                        <input value={values.address} disabled className="form-control" name="address" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Ngày Tạo</p>
                        <input value={values.dateCreated} className="form-control" name="dateCreated" onChange={handleChange} />
                    </div>
                </div>



                <div className="col-12">
                    <table className="table" style={{ marginBottom: 30 }}>
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
                            {values.listOrderDetail?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.nameProduct}</td>
                                    <td><img src={item.image} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>


                                </tr>
                            })}



                        </tbody>
                    </table>
                </div>
                <div className="col-12">

                    <div className="form-group">
                        <p className="font-weight-bold">Trạng Thái</p>
                        <select className="form-control" name="statusId" value={values.statusId} onChange={handleChange}>
                            {listStatus?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.statusName}
                                </option>
                            })}
                        </select>
                    </div>


                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Tổng Tiền</p>
                        <input className="form-control" disabled value={values.total} name="total" onChange={handleChange} />
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





const CreatedOrderForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { editOrder } = props

        return {

            id: editOrder.id,
            name: editOrder.address1.name,
            address: editOrder.address1.address,
            phone:editOrder.address1.address,
            total: editOrder.total.toLocaleString() +' Vnđ',
            statusId:editOrder.statusId,
            listOrderDetail:editOrder.orderDetails,
            dateCreated:editOrder.created_at,
            

        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {



        props.dispatch({
            type: UPDATE_ORDER_SAGA,
            orderModel: values
        })
        console.log('Asasa', values)


    },
    displayName: '',
})(FormEditedOrder);

const mapStateToProps = (state) => ({

    editOrder: state.OrderReducers.editOrder



})



export default connect(mapStateToProps)(CreatedOrderForm);