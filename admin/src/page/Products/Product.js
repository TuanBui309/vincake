import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button, Avatar, Popconfirm, message, Popover, AutoComplete, Image } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import FormCreateProduct from '../../components/Form/Products/FormCreateProduct'
import { NavLink } from 'react-router-dom';
import { DELETE_CATEGORIES_SAGA, GET_ALL_CATEGORIES_SAGA } from '../../redux/constants/Categories/Categories';
import { DOMAIN, DOMAIN_CYBERBUG } from '../../util/constants/settingSystem';

import { DELETE_PRODUCT_SAGA, GET_ALL_PRODUCT_SAGA } from '../../redux/constants/Product/Product';
import FormEditProduct from '../../components/Form/Products/FormEditProduct';



export default function Categories(props) {
    //Lấy dữ liệu từ reducer về component
    const productList = useSelector(state => state.ProductReducers.productList)

    const [value, setValue] = useState('');
    const searchRef = useRef(null);


    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({
            type: GET_ALL_PRODUCT_SAGA,
            filter: {
                keyWord: value,
                filters: ''


            }

        })

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
            title: 'Tên Sản Phẩm',
            dataIndex: 'tenSP',
            key: 'tenSP',
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

        {
            title: 'Loại',
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
            title: 'Giá Bán',
            dataIndex: 'giaBan',
            key: 'giaBan',


        },
        {
            title: 'Sale',
            dataIndex: 'sale',
            key: 'sale',


        },
        {
            title: 'Số Lượng',
            dataIndex: 'soLuong',
            key: 'tenSanPham',


        },
        {
            title: 'Tình Trạng',
            dataIndex: 'tinhTrang',
            key: 'tinhTrang',


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
                            Component: < FormEditProduct />,
                        }

                        // dispatch lên reducer nội dung drawer
                        dispatch(action);
                        // dispatch dữ liệu dòng hiện tai lên reducer
                        const actionCategories = {
                            type: 'EDIT_PRODUCT',
                            ProductModel: record
                        }
                        dispatch(actionCategories);

                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this categories?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_PRODUCT_SAGA, id: record.id })
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
            <h3>Sản Phẩm</h3>

            <Space style={{ marginBottom: 16 }}>
                <Button onClick={() => {
                    const action = {
                        type: 'OPEN_FORM_CREATE',
                        title: 'Them  San Pham',
                        Component: < FormCreateProduct />,
                    }

                    //dispatch lên reducer nội dung drawer
                    dispatch(action);
                    // dispatch dữ liệu dòng hiện tai lên reducer


                }}>Them moi</Button>
                  <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 250, alignItems: 'center' }}
                options={productList?.map((user, index) => {
                    return { label: user.tenSP, value: user.id.toString() }
                })}
                value={value}

                onChange={(text) => {
                    setValue(text);
                }}
                onSelect={(valueSelect, option) => {
                    //set giá trị của hộp thọa = option.label
                    setValue(option.label);
                    dispatch({
                        type: GET_ALL_PRODUCT_SAGA,
                        filter: {
                            keyWord: option.label,
                            filters: ""
                        }
                    })


                }}

                onSearch={(value) => {

                    if (searchRef.current) {
                        clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                        dispatch({
                            type: GET_ALL_PRODUCT_SAGA,
                            filter: {
                                keyWord: value,
                                filters: ''


                            }

                        })

                    }, 300)

                }}






            >



            </AutoComplete>

            </Space>
          
            <Table columns={columns} rowKey={"id"} dataSource={productList} onChange={handleChange} />
        </div>
    )
}
