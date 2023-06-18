import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button, Avatar, Popconfirm, message, Popover, AutoComplete, Image } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import { NavLink } from 'react-router-dom';

import { DOMAIN, DOMAIN_CYBERBUG } from '../../util/constants/settingSystem';
import { DELETE_SUPPLIER_SAGA, GET_ALL_SUPPLIER_SAGA } from '../../redux/constants/Supplier/Supplier';
import FormCreatedSupplier from '../../components/Form/Supplier/FormCreatedSupplier';
import FormEditSupplier from '../../components/Form/Supplier/FormEditSupplier';




export default function Supplier(props) {
    //Lấy dữ liệu từ reducer về component
    const listSupplier = useSelector(state => state.SupplierReducers.listSupplier)
    


    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({ type:GET_ALL_SUPPLIER_SAGA })

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
            title: 'Ten Nha Cung Cap',
            dataIndex: 'name',
            key: 'name',
           
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
            title: 'So Dien Thoai',
            dataIndex: 'phone',
            key: 'phone',
           

        },
        {
            title: 'Dia Chi',
            dataIndex: 'address',
            key: 'address',
           

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
                            title: 'Sua Thong Tin Nha cung Cap',
                            Component:<FormEditSupplier></FormEditSupplier>,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionCategories = {
                            type: 'EDIT_SUPPLIER',
                            editSupplier: record
                        }
                        dispatch(actionCategories);

                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this categories?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_SUPPLIER_SAGA, id: record.id })
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
                            type: 'OPEN_FORM_CREATE',
                            title: 'Them Hoa Don Nhap',
                            Component: <FormCreatedSupplier></FormCreatedSupplier>,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        

                    }}>Them moi</Button>
               
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={listSupplier} onChange={handleChange} />
        </div>
    )
}
