import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';


import { notifiFunction } from "../../util/Notification/notificationCyberbugs";



import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

import { STATUS_CODE } from '../../util/constants/settingSystem';
import { statisticService } from '../../services/StatisticService';
import { THONG_KE_CHI_TIEU_THEO_NAM, THONG_KE_CHI_TIEU_THEO_NAM_SAGA, THONG_KE_CHI_TIEU_THEO_THANG, THONG_KE_CHI_TIEU_THEO_THANG_SAGA, THONG_KE_HOA_DON_BAN_DXL, THONG_KE_HOA_DON_BAN_DXL_SAGA, THONG_KE_HOA_DON_BAN_DXL_THEO_THANG, THONG_KE_HOA_DON_BAN_DXL_THEO_THANG_SAGA, THONG_KE_HOA_DON_NHAP_DXL, THONG_KE_HOA_DON_NHAP_DXL_SAGA, THONG_KE_THU_NHAP_THEO_LOAI, THONG_KE_THU_NHAP_THEO_LOAI_SAGA, THONG_KE_THU_NHAP_THEO_NAM, THONG_KE_THU_NHAP_THEO_NAM_SAGA, THONG_KE_THU_NHAP_THEO_THANG, THONG_KE_THU_NHAP_THEO_THANG_SAGA, THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL, THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL_SAGA, THONG_KE_TOP_5_PRODUCT_BC } from '../constants/Statistic.js/Statistic';
import { THONG_KE_TOP_5_PRODUCT_BC_SAGA } from '../constants/Statistic.js/Statistic';



function* thongKeChiTieuTheoNams(action) {
    console.log(action)
  
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeChiTieuTheoNam(action.Year));

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_CHI_TIEU_THEO_NAM,
                listChiTieuTheoNam: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeChiTieuTheoNam() {
    yield takeLatest(THONG_KE_CHI_TIEU_THEO_NAM_SAGA, thongKeChiTieuTheoNams);
}
function* thongKeThuNhapTheoNams(action) {
    console.log(action)
  
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeThuNhapTheoNam(action.Year));

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_THU_NHAP_THEO_NAM,
                listThuNhapTheoNam: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeThuNhapTheoNam() {
    yield takeLatest(THONG_KE_THU_NHAP_THEO_NAM_SAGA, thongKeThuNhapTheoNams);
}
function* thongKeHDBDXLTheoNams(action) {
    console.log(action)
  
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeHDBDXLTheoNam(action.Year));

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_HOA_DON_BAN_DXL,
                listHDBDXLTheoNam: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeHDBDXLTheoNam() {
    yield takeLatest(THONG_KE_HOA_DON_BAN_DXL_SAGA, thongKeHDBDXLTheoNams);
}
function* thongKeHDNDXLTheoNams(action) {
    console.log(action)
  
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeHDNDXLTheoNam(action.Year));

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_HOA_DON_NHAP_DXL,
                listHDNDXLTheoNam: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeHDNDXLTheoNam() {
    yield takeLatest(THONG_KE_HOA_DON_NHAP_DXL_SAGA, thongKeHDNDXLTheoNams);
}




//theo thang
function* thongKeChiTieuTheoThangs(action) {
    console.log(action)
  
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeChiTieuTheoThang());

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_CHI_TIEU_THEO_THANG,
                listChiTieuTheoThang: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeChiTieuTheoThang() {
    yield takeLatest(THONG_KE_CHI_TIEU_THEO_THANG_SAGA, thongKeChiTieuTheoThangs);
}

function* thongKeThuNhapTheoThangs(action) {
    console.log(action)
  
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeThuNhapTheoThang());

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_THU_NHAP_THEO_THANG,
                listThuNhapTheoThang: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeThuNhapTheoThang() {
    yield takeLatest(THONG_KE_THU_NHAP_THEO_THANG_SAGA, thongKeThuNhapTheoThangs);
}
function* thongKeHDBCXLTheoThangs(action) {
    console.log(action)
  
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeHDBDXLTheoThang());

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_HOA_DON_BAN_DXL_THEO_THANG,
                listHBDBXLTheoThang: data.content
            })

        }
      
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeHDBCXLTheoThang() {
    yield takeLatest(THONG_KE_HOA_DON_BAN_DXL_THEO_THANG_SAGA, thongKeHDBCXLTheoThangs);
}

//theo loai

function* thongKeThuNhapTheoLoais(action) {
    console.log(action)
    console.log('tuNgay',action.date.tuNgay)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.ThongKeThuNhapTheoLoai(action.date));

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_THU_NHAP_THEO_LOAI,
                listThuNhapTheoLoai: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeThuNhapTheoLoai() {
    yield takeLatest(THONG_KE_THU_NHAP_THEO_LOAI_SAGA, thongKeThuNhapTheoLoais);
}



//top 5
function* thongKeTop5ProductBCS(action) {
    console.log(action)
    console.log('tuNgay',action.dates.tuNgay)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.Top5ProductBC(action.dates));

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_TOP_5_PRODUCT_BC,
                listTop5Product: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeTop5Product() {
    yield takeLatest(THONG_KE_TOP_5_PRODUCT_BC_SAGA, thongKeTop5ProductBCS);
}





function* thongKeTop5Customer(action) {
    console.log(action)
    console.log('tuNgay',action.datetime.tuNgay)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => statisticService.Top5Customer(action.datetime));

       
        console.log('data',data)
        if(status=== STATUS_CODE.SUCCESS)
        {
            yield put({
                type: THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL,
                listTop5Customer: data.content
            })

        }
      


       
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiThongKeTop5Customer() {
    yield takeLatest(THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL_SAGA, thongKeTop5Customer);
}
