import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button, Avatar, Popconfirm, message, Popover, AutoComplete, Image } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import { NavLink } from 'react-router-dom';


import FormEdited from '../../components/Form/Categories/FormEdited';
import { DELETE_ALL_PRODUCT_BILLS, DELETE_BILLS_SAGA, EDIT_BILL, GET_ALL_BILLS_SAGA, GET_DETAIL_BILL_BY_ID_SAGA } from '../../redux/constants/Bills/Bills';
import FormCreateBill from '../../components/Form/Bills/FormCreateBill';
import FormEditBill from '../../components/Form/Bills/FormEditBill';



export default function Bills(props) {
    //Lấy dữ liệu từ reducer về component
    const listBill = useSelector(state => state.BillReducers.listBill)
    console.log(listBill)


    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({ type: GET_ALL_BILLS_SAGA })

    }, [])

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],

        },
        {
            title: 'Người Lập Hóa Đơn',
            // dataIndex: 'creator',
            key: 'userName',
            render: (text, record, index) => {
                return <Tag color="green">{record.userName}</Tag>
            },
          

        },
        {
            title: 'Nhà Cung Cấp',
            dataIndex: 'supplierName',
            key: 'supplierName',
          
            sorter: (item2, item1) => {
                let creator1 = item1.supplierName.trim().toLowerCase();
                let creator2 = item2.supplierName.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },

        },

        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         let contentJSX = ReactHtmlParser(text);

        //         return <div>
        //             {contentJSX}
        //         </div>
        //     }
        // },

        {
            title: 'Editor',
            key: 'Editor',
            render: (text, record, index) => {
                return <div>
                   
                       
                            <Popover key={index} placement="top" title="Editor" content={() => {
                                return <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Ten Nguoi Sua</th>
                                            <th>avatar</th>
                                            <th>Trang Thai</th>
                                            <th>Ngay Sua</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.lstEditor?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td>{item.userNameEditoer}</td>
                                                <td><img src={item.avatar} width="30" height="30" style={{borderRadius:'15px'}} /></td>
                                                
                                                <td>{item.statusNames}</td>
                                                <td>{item.updated_at}</td>
                                               
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            }}>
                                <Button >{record.statusName}</Button>
                            </Popover>
                        
                   

                  

                   
                </div>
            }

        },
        {
            title: 'Ngày Lập Hóa Đơn',
            dataIndex: 'created_at',
            key: 'created_at',
           

        },

        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            render: (text, record, index) => {
                return record.total.toLocaleString() +' Vnđ'
            },
          
           

        },
       

        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button className="btn mr-2 btn-primary" onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT',
                            title: 'Sua Hoa Don Nhap',
                            Component: <FormEditBill></FormEditBill>,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        dispatch({
                            type:GET_DETAIL_BILL_BY_ID_SAGA,
                            billId:record.id
                        })
                        console.log(record.id)
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionBills = {
                            type: EDIT_BILL,
                            editBillModel: record
                        }
                        dispatch(actionBills);

                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this categories?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_BILLS_SAGA, id: record.id })
                            console.log(record.id)
                        }}
                        

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>

                </div>
            },
        }
    ];
    return (
        <div className="container-fluid m-5">
            <h3>Project management</h3>
            
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT',
                            title: 'Them  Hoa Don Nhap',
                            Component: < FormCreateBill />,
                        }
                        dispatch({
                            type:DELETE_ALL_PRODUCT_BILLS
                        })

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        

                    }}>Them moi</Button>
               
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={listBill} onChange={handleChange} />
        </div>
    )
}
