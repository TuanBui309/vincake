import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';


import { notifiFunction } from "../../util/Notification/notificationCyberbugs";


import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

import { STATUS_CODE } from '../../util/constants/settingSystem';
import { orderServices } from '../../services/OrderService';
import { DELETE_ORDER_SAGA, GET_ALL_ORDER, GET_ALL_ORDER_SAGA, UPDATE_ORDER_SAGA } from '../constants/Order/Order';

function* getAllOrder(action) {
    console.log(action)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => orderServices.getAllOrder());

        //Lưu vào localstorage khi đăng nhập thành công
        console.log('data',data)
      


        yield put({
            type: GET_ALL_ORDER,
            orderList: data.content
        })
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiGetAllOrder() {
    yield takeLatest(GET_ALL_ORDER_SAGA, getAllOrder);
}

function* deleteOrders(action){
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => orderServices.deleteOrder(action.id));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getAllOrder);
        yield put({
            type:'CLOSE_DRAWER'
        })
    } 
    catch(err){
        notifiFunction('error',err.response.data.message)


    }

    yield put(
        {
            type:HIDE_LOADING
        }
    )
}
function* updateOrders(action){
    yield put({
        type:DISPLAY_LOADING
    })
    delay(500)
    try{
        const {data,status}=yield call(()=>orderServices.updateOrder(action.orderModel))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }
        yield call(getAllOrder);
        yield put({
            type:'CLOSE_DRAWER'
        })

    }
    catch(err){
        console.log(err.response)
    }
    yield put(
        {
            type:HIDE_LOADING
        }
    )
}
export function* theoDoiUpdateOrder(){
    yield takeLatest(UPDATE_ORDER_SAGA,updateOrders)
}


export function* theoDoiDeleteOrder()
{
    yield takeLatest(DELETE_ORDER_SAGA,deleteOrders);
}