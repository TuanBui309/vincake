import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button, Avatar, Popconfirm, message, Popover, AutoComplete, Image } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import FormCreated from '../../components/Form/Categories/FormCreated'
import { NavLink } from 'react-router-dom';
import { DELETE_CATEGORIES_SAGA, GET_ALL_CATEGORIES_SAGA } from '../../redux/constants/Categories/Categories';
import { DOMAIN, DOMAIN_CYBERBUG } from '../../util/constants/settingSystem';
import FormEdited from '../../components/Form/Categories/FormEdited';



export default function Categories(props) {
    //Lấy dữ liệu từ reducer về component
    const categoriesList = useSelector(state => state.CategoriesReducers.categoriesList)
    console.log(categoriesList)


    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({ type: GET_ALL_CATEGORIES_SAGA })

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
            title: 'image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record, index) => {
                return <div>



                    <Image
                        width={200}
                        src={record.image}

                    />







                </div>
               
            }

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
            title: 'Ten Loai',
            dataIndex: 'tenLoai',
            key: 'tenLoai',
            sorter: (item2, item1) => {
                let categoryName1 = item1.tenLoai?.trim().toLowerCase();
                let categoryName2 = item2.tenLoai?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
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
                            title: 'Them Loai San PhAM',
                            Component: < FormEdited />,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionCategories = {
                            type: 'EDIT_CATEGORIES',
                            CategoriesModel: record
                        }
                        dispatch(actionCategories);

                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this categories?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_CATEGORIES_SAGA, id: record.id })
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
            <h3>Loại Sản Phẩm</h3>
            
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_CREATE',
                            title: 'Them Loai San Pham',
                            Component: < FormCreated />,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        

                    }}>Them moi</Button>
               
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={categoriesList} onChange={handleChange} />
        </div>
    )
}
