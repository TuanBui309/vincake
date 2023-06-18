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


function FormEditBill(props) {

    const listDetail = useSelector(state => state.BillReducers.listDetail);
    const listStatus = useSelector(state => state.StatusOrderReducers.listStatus);
    const listSupplier = useSelector(state => state.SupplierReducers.listSupplier);
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
                        <p className="font-weight-bold">Ma Hoa Don Nhap</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Nguoi Tao Hoa Don</p>
                        <input value={values.userName} className="form-control" name="userName" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Nhà Cung Cấp</p>
                        <input value={values.supplierName} disabled className="form-control" name="supplierName" onChange={handleChange} />
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
                            {listDetail?.map((item, index) => {
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
                        <p className="font-weight-bold">Trang Thai</p>
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





const CreatedProductForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { editBillModel } = props

        return {

            id: editBillModel.id,
            userName: editBillModel.userName,
            supplierName: editBillModel.supplierName,
            total: editBillModel.total,
            statusId:editBillModel.statusId,
            dateCreated:editBillModel.created_at,
            

        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {



        props.dispatch({
            type: UPDATE_BILL_SAGA,
            billModel: values
        })
        console.log('Asasa', values)


    },
    displayName: '',
})(FormEditBill);

const mapStateToProps = (state) => ({

    editBillModel: state.BillReducers.editBillModel



})



export default connect(mapStateToProps)(CreatedProductForm);