import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button, Avatar, Popconfirm, message, Popover, AutoComplete, Image } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import { NavLink } from 'react-router-dom';

import { DOMAIN, DOMAIN_CYBERBUG } from '../../util/constants/settingSystem';
import { DELETE_USER_SAGA, GET_ALL_USER_SAGA } from '../../redux/constants/User/User';
import FormEditedUser from '../../components/Form/User/FormEditedUser';
import FormCreatedUser from '../../components/Form/User/FormCreatedUser';

import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';



const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                <UserOutlined /> {count}
            </span>
        </div>
    ),
});







export default function User(props) {
    const [value, setValue] = useState('');


    //Lấy dữ liệu từ reducer về component
    const listUser = useSelector(state => state.UsersReducers.listUser)
    console.log("â", listUser)



    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({
            type:GET_ALL_USER_SAGA,
            keyWord:''
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
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],

        },
        {
            title: 'Tên Nhân Viên',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'image',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, record, index) => {
                return <div>



                    <Image
                        width={50}
                        style={{ borderRadius: 50 }}
                        src={record.avatar}

                    />







                </div>

            }

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

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
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',


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
                            title: 'Sửa Thông tin nhân viên',
                            Component: <FormEditedUser></FormEditedUser>,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionCategories = {
                            type: 'EDIT_USER',
                            editUser: record
                        }
                        dispatch(actionCategories);

                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this categories?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_USER_SAGA, id: record.userId })
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
            <h3>Nhân Viên</h3>

            <Space style={{ marginBottom: 16 }}>
                <Button onClick={() => {
                    const action = {
                        type: 'OPEN_FORM_CREATE',
                        title: 'Them Nhân Viên',
                        Component: <FormCreatedUser></FormCreatedUser>,
                    }

                    //dispatch lên reducer nội dung drawer
                    dispatch(action);
                    //dispatch dữ liệu dòng hiện tai lên reducer


                }}>Them moi</Button>
                  <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 250 ,alignItems:'center'}}
                options={listUser?.map((user, index) => {
                    return { label: user.name, value: user.userId.toString() }
                })}
                value={value}

                onChange={(text) => {
                    setValue(text);
                }}
                onSelect={(valueSelect, option) => {
                    //set giá trị của hộp thọa = option.label
                    setValue(option.label);
                    dispatch({
                        type: GET_ALL_USER_SAGA,
                        keyWord: option.label
                    })


                }}

                onSearch={(value) => {
                                    
                    if(searchRef.current) {
                        clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(()=>{
                        dispatch({
                            type: GET_ALL_USER_SAGA,
                            keyWord: value
                        })

                    },300)
                   
                }}
                

                

               
                
            >
                
                
              
            </AutoComplete>

            </Space>
          
            <Table columns={columns} rowKey={"userId"} dataSource={listUser} onChange={handleChange} />
        </div>
    )
}
