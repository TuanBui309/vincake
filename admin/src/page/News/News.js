import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button, Avatar, Popconfirm, message, Popover, AutoComplete, Image } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_NEWS_SAGA, GET_ALL_NEWS_SAGA } from '../../redux/constants/News/News';
import FormCreatedNews from '../../components/Form/News/FormCreatedNews';
import FormEditedNews from '../../components/Form/News/FormEditedNews';








export default function News(props) {
    //Lấy dữ liệu từ reducer về component
    const listNews = useSelector(state => state.NewsReducers.listNews)
    console.log(listNews)


    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({ type: GET_ALL_NEWS_SAGA })

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
            title: 'Người Đăng',
            // dataIndex: 'creator',
            key: 'user1',
            render: (text, record, index) => {
                return <Tag color="green">{record.user1?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
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
            title: 'Mô Tả',
            dataIndex: 'moTa',
            key: 'moTa',
            render: (text, record, index) => {
                let contentJSX = ReactHtmlParser(text);

                return <div>
                    {contentJSX}
                </div>
            }
        },

        {
            title: 'Nội Dung',
            dataIndex: 'noiDung',
            key: 'noiDung',
            sorter: (item2, item1) => {
                let categoryName1 = item1.noiDung?.trim().toLowerCase();
                let categoryName2 = item2.noiDung?.trim().toLowerCase();
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
                            title: 'Sửa Tin Tức',
                            Component: <FormEditedNews></FormEditedNews>,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionCategories = {
                            type: 'EDIT_NEWS',
                            editNews: record
                        }
                        dispatch(actionCategories);

                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this categories?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_NEWS_SAGA, id: record.id })
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
            <h3>Tin Tức</h3>
            
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_CREATE',
                            title: 'Thêm Tin Tức',
                            Component: <FormCreatedNews></FormCreatedNews>,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        

                    }}>Them moi</Button>
               
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={listNews} onChange={handleChange} />
        </div>
    )
}
