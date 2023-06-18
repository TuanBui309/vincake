import React, { useEffect } from 'react'
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale, PointElement, Legend

} from 'chart.js';
import { useSelector, useDispatch } from 'react-redux'
import { THONG_KE_CHI_TIEU_THEO_NAM_SAGA, THONG_KE_CHI_TIEU_THEO_THANG_SAGA, THONG_KE_HOA_DON_BAN_DXL_SAGA, THONG_KE_HOA_DON_BAN_DXL_THEO_THANG_SAGA, THONG_KE_HOA_DON_NHAP_DXL_SAGA, THONG_KE_THU_NHAP_SAGA, THONG_KE_THU_NHAP_THEO_LOAI_SAGA, THONG_KE_THU_NHAP_THEO_NAM_SAGA, THONG_KE_THU_NHAP_THEO_THANG_SAGA, THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL, THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL_SAGA, THONG_KE_TOP_5_PRODUCT_BC_SAGA } from '../../redux/constants/Statistic.js/Statistic';
export default function Statistic() {
  Chartjs.register(
    LineElement,
    CategoryScale,
    LinearScale, PointElement, Legend
  )


  const { RangePicker } = DatePicker;

//theo nam
  const listChiTieuTheoNam = useSelector(state => state.StatisticReducers.listChiTieuTheoNam)
  const listHDNDXLTheoNam = useSelector(state => state.StatisticReducers.listHDNDXLTheoNam)
  const listThuNhapTheoNam = useSelector(state => state.StatisticReducers.listThuNhapTheoNam)
  const listHDBDXLTheoNam = useSelector(state => state.StatisticReducers.listHDBDXLTheoNam)
  //theo thang
  const listChiTieuTheoThang = useSelector(state => state.StatisticReducers.listChiTieuTheoThang)
  const listThuNhapTheoThang = useSelector(state => state.StatisticReducers.listThuNhapTheoThang)
  const listHBDBXLTheoThang = useSelector(state => state.StatisticReducers.listHBDBXLTheoThang)

  //top 5
  const listTop5Customer = useSelector(state => state.StatisticReducers.listTop5Customer)
  const listTop5Product = useSelector(state => state.StatisticReducers.listTop5Product)



  const listThuNhapTheoLoai = useSelector(state => state.StatisticReducers.listThuNhapTheoLoai)
  const dispatch = useDispatch();
  const onChangeYear = (date, dateString) => {
    console.log(date, dateString);
    dispatch({ type: THONG_KE_CHI_TIEU_THEO_NAM_SAGA ,
      Year:dateString})
    dispatch({ type: THONG_KE_HOA_DON_NHAP_DXL_SAGA ,
      Year:dateString})
    dispatch({ type: THONG_KE_THU_NHAP_THEO_NAM_SAGA ,
      Year:dateString})
    dispatch({ type: THONG_KE_HOA_DON_BAN_DXL_SAGA ,
      Year:dateString})
  };
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    dispatch(
      {
        type: THONG_KE_THU_NHAP_THEO_LOAI_SAGA,
        date: {
          tuNgay: dateString[0],
          denNgay: dateString[1]
        }
      }
    )

  };
  
  const onChangeTop5Product = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    dispatch(
      {
        type: THONG_KE_TOP_5_PRODUCT_BC_SAGA,
        dates: {
          tuNgay: dateString[0],
          denNgay: dateString[1]
        }
      }
    )

  };
  
  const onChangeTop5Customer = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    dispatch(
      {
        type: THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL_SAGA,
        datetime: {
          tuNgay: dateString[0],
          denNgay: dateString[1]
        }
      }
    )

  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  
  useEffect(() => {
    //THEO NAM
    dispatch({ type: THONG_KE_CHI_TIEU_THEO_NAM_SAGA ,
      Year:''})
    dispatch({ type: THONG_KE_HOA_DON_NHAP_DXL_SAGA ,
      Year:''})
    dispatch({ type: THONG_KE_THU_NHAP_THEO_NAM_SAGA ,
      Year:''})
    dispatch({ type: THONG_KE_HOA_DON_BAN_DXL_SAGA ,
      Year:''})

    //theo thang
    dispatch({ type: THONG_KE_CHI_TIEU_THEO_THANG_SAGA })
    dispatch({ type: THONG_KE_THU_NHAP_THEO_THANG_SAGA })
    dispatch({ type: THONG_KE_HOA_DON_BAN_DXL_THEO_THANG_SAGA })

    //theo loai


    dispatch({
      type: THONG_KE_THU_NHAP_THEO_LOAI_SAGA,
      date: {
        tuNgay: '',
        denNgay: ''
      }


    })
 
    //top 5
    dispatch({
      type: THONG_KE_TOP_5_PRODUCT_BC_SAGA,
      dates: {
        tuNgay: '',
        denNgay: ''
      }


    })
    dispatch({
      type: THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL_SAGA,
      datetime: {
        tuNgay: '',
        denNgay: ''
      }


    })
   


  }, [])
  return (

    <div className="container-fluid page-body-wrapper">


      <div id="right-sidebar" className="settings-panel">
        <i className="settings-close ti-close" />
        <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
          </li>
        </ul>

      </div>


      <div className="main-panel" style={{ width: '100%' }}>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h3 className="font-weight-bold">Chào mừng trở lại với Vincake</h3>
                  <h6 className="font-weight-normal mb-0">Chúc bạn có một ngày vui vẻ <span className="text-primary">,làm việc thật hiệu quả</span></h6>
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card tale-bg">
                <div className="card-people mt-auto">
                  <img src="assets/img/b.jpg" style={{ height: 320, width: 685 }} className="mr-2" alt="logo" />

                  <div className="weather-info">

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin transparent">
              <div className="row">
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Chi Tiêu  trong tháng</p>
                      <p className="fs-30 mb-2">{listChiTieuTheoThang.total?.toLocaleString()} VNĐ</p>
                     
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-dark-blue">
                    <div className="card-body">
                      <p className="mb-4">Thu nhập trong tháng</p>
                      <p className="fs-30 mb-2">{listThuNhapTheoThang.total?.toLocaleString()} VNĐ</p>
                     
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">Số hóa đơn hàng chưa xử lý</p>
                      <p className="fs-30 mb-2">{listHBDBXLTheoThang.total} đơn</p>
                      
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>



          <div className="row">
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Thống kê Hóa đơn</h4>
                  <DatePicker onChange={onChangeYear} picker="year" />

                  <Line
                    data={{
                      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                      datasets: [
                        {
                          data: listChiTieuTheoNam.map(item => item.total),
                          label: "Chi Tiêu",
                          borderColor: "black",
                          fill: false
                        },
                        {
                          data: listHDNDXLTheoNam.map(item => item.total),
                          label: "HDN đang xử lý",
                          borderColor: "blue",
                          fill: false
                        },
                        {
                          data: listThuNhapTheoNam.map(item => item.total),
                          label: "Thu Nhap",
                          borderColor: "yellow",
                          fill: false
                        },
                        {
                          data: listHDBDXLTheoNam.map(item => item.total),
                          label: "HDB đang xử lý",
                          borderColor: "red",
                          fill: false
                        },

                      ]
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "World population per region (in millions)"
                      },
                      legend: {
                        display: true,
                        position: "bottom"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Thống kê Thu nhập theo loại</h4>
                  <Space direction="vertical" size={12}>
                    <RangePicker

                      format="DD/MM/YYYY"
                      onChange={onChange}
                      onOk={onOk}
                    />


                  </Space>
                  <Pie
                    data={{
                      labels: listThuNhapTheoLoai.map(item => item.category),
                      datasets: [
                        {
                          label: "Population (millions)",
                          backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",

                          ],
                          data: listThuNhapTheoLoai.map(item => item.total),
                        }
                      ]
                    }}
                    option={{
                      title: {
                        display: true,
                        text: "Predicted world population (millions) in 2050"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Top 5 San Pham Ban Chay</h4>
                  <Space direction="vertical" size={12}>
                    <RangePicker

                      format="DD/MM/YYYY"
                      onChange={onChangeTop5Product}
                      onOk={onOk}
                    />


                  </Space>
                  <Bar
                    data={{
                      labels:listTop5Product.map(item=>item.productName),
                      datasets: [
                        {
                          label: "Top 5 sản phẩm bán chạy ",
                          backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850"
                          ],
                          data: listTop5Product.map(item=>item.total)
                        }
                      ]
                    }}
                    options={{
                      legend: { display: false },
                      title: {
                        display: true,
                        text: ""
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Top 5 Khach Hang Chiu Chi</h4>
                  <Space direction="vertical" size={12}>
                    <RangePicker

                      format="DD/MM/YYYY"
                      onChange={onChangeTop5Customer}
                      onOk={onOk}
                    />


                  </Space>
                  <Bar
                    data={{
                      labels:listTop5Customer.map(item=>item.nameCustomer),
                      datasets: [
                        {
                          label: "Top 5 khách hàng chịu chi ",
                          backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850"
                          ],
                          data: listTop5Customer.map(item=>item.total)
                        }
                      ]
                    }}
                    options={{
                      legend: { display: false },
                      title: {
                        display: true,
                        text: ""
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>

  )
}
