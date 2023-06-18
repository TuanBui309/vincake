import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button, Popconfirm , Popover, AutoComplete, Image } from 'antd';

import { FormOutlined, DeleteOutlined, } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import { NavLink } from 'react-router-dom';
import { DELETE_ORDER_SAGA, GET_ALL_ORDER_SAGA } from '../../redux/constants/Order/Order';
import FormEditedOrder from '../../components/Form/Order/FormEditedOrder';






export default function Orders(props) {
    //Lấy dữ liệu từ reducer về component
    const orderList = useSelector(state => state.OrderReducers.orderList)
    console.log(orderList)


    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({ type: GET_ALL_ORDER_SAGA })

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
            title: 'Tên Khách Hàng',
            dataIndex: 'name',
            key: 'name',
           
            render: (text, record, index) => {
                return <Tag color="green">{record.customers.name}</Tag>
            },
            
          
         

        },
        {
            title: 'Ngày Lập Hóa Đơn',
            dataIndex: 'created_at',
            key: 'created_at',
           

        },

       

        {
            title: 'Tinh Trang',
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
                                <Button >{record.status1.statusName}</Button>
                            </Popover>
                        
                   

                  

                   
                </div>
            }

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
                            Component: <FormEditedOrder></FormEditedOrder>,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                      
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionBills = {
                            type: 'EDIT_ORDER',
                            editOrder: record
                        }
                        dispatch(actionBills);

                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this categories?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_ORDER_SAGA, id: record.id })
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
            <h3>Hóa Đơn Bán</h3>
            
            <Space style={{ marginBottom: 16 }}>
               
               
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={orderList} onChange={handleChange} />
        </div>
    )
}
