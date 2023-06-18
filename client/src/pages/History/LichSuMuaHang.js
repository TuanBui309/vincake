
import React, { useEffect, useRef, useState } from 'react'
import { Table, Popconfirm, Image, Popover, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DAT_LAI_SAGA, GET_LIST_HISTORY_SAGA, HUY_DON_HANG_SAGA } from '../../redux/constants/Home';
import { FormOutlined, DeleteOutlined,EyeOutlined } from '@ant-design/icons'
import { Button } from 'antd/es/radio';

export default function LichSuMuaHang() {
    const [value, setValue] = useState('');


    //Lấy dữ liệu từ reducer về component
    const listHistory = useSelector(state => state.HomeReducers.listHistory)

    console.log('aaa', listHistory)




    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({
            type: GET_LIST_HISTORY_SAGA,

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

        {
            title: 'Tên Người Nhận',
            dataIndex: 'name',
            key: 'name',

            render: (text, record, index) => {
                return <Tag color="green">{record.address1.name}</Tag>
            },




        },
        {
            title: 'Ngày Đặt',
            dataIndex: 'created_at',
            key: 'created_at',






        },
        {
            title: 'Địa Chỉ Nhận Hàng',
            dataIndex: 'address',
            key: 'address',

            render: (text, record, index) => {
                return <Tag >{record.address1.address}</Tag>
            },




        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',

            render: (text, record, index) => {
                return <Tag >{record.address1.phone}</Tag>
            },




        },

        {
            title: 'Sản Phẩm',
            key: 'product',
            render: (text, record, index) => {
                return <div>


                    <Popover key={index} placement="top" title="Editor" content={() => {
                        return <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Hình Ảnh</th>
                                    <th>Số Lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.orderDetails?.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.nameProduct}</td>
                                        <td><img src={item.image} width="30" height="30" style={{ borderRadius: '15px' }} /></td>

                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }}>
                        <Button ><EyeOutlined /></Button>
                    </Popover>






                </div>
            }

        },

        {
            title: 'Trạng Thái',
            key: 'status',
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
                                        <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>

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
            key: 'total',

            render: (text, record, index) => {
                return record.total.toLocaleString() + ' Vnđ'

            },


        },


        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                   {record.statusId===14 || record.statusId===13  ? (  <Popconfirm
                        title="Bạn Có chắc muốn đặt lại đơn hàng này không?"
                        onConfirm={() => {
                            
                            dispatch({
                                type: DAT_LAI_SAGA,
                                datLaiModel: {
                                    idOrder: record.id,
                                idStatus: record.statusId
                                }
                            })
                           
                        }}
                        

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn mr-2 btn-primary">
                            Đặt Lại
                        </button>
                    </Popconfirm>):(  <Popconfirm
                        title="Bạn có chắc muốn hủy đơn hàng này không?"
                        onConfirm={() => {
                            dispatch({ type: HUY_DON_HANG_SAGA,
                                orderModel1: {idOrder:record.id,idStatus:record.statusId}


                            })
                            console.log(record.id)
                        }}
                        

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            Hủy Đơn Hàng
                        </button>
                    </Popconfirm>)}
                    

                </div>
            },
        }
    ];


    return (
        <div className="main-container">
            <section className="page-title-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 m-auto">
                            <div className="page-title-content text-center">
                                <h2 className="title">Lich Su Mua Hang</h2>
                                <div className="bread-crumbs"><a href="index.html"> Home </a><span className="breadcrumb-sep"> //
                                </span><span className="active"> Lichsu</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row" style={{ paddingTop: 50 }}>
            
                <div id="content" className="col-sm-11" style={{ margin: 'auto' }}>
                <div style={{textAlign:'center'}}> Chào mừng đến với cửa hàng VinCake</div>
                    <Table columns={columns} rowKey={"id"} dataSource={listHistory} onChange={handleChange} />


                </div>







            </div >
        </div >

    )
}
