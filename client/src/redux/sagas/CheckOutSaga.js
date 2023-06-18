import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';

import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { checkoutService } from '../../services/CheckOutService';
import { authService } from '../../services/AuthService';
import { notifiFunction } from '../../util/Notification/notificationCyberbugs';
function* addOrder(action){
    try{
        const {data,status}=yield call(()=>checkoutService.addOrder(action.orderModel))
        if(status===STATUS_CODE.SUCCESS){
            console.log(data)
            notifiFunction('success',data.message)
            window.location.replace('/')
        }

    }
    catch(err){
        console.log(err.response.data)
    }
}
export function* theoDoiAddOrder(){
    yield takeLatest("ADD_ORDER_SAGA",addOrder);
}
function* getAllAddress(){

    try{
        const {data}=yield call(()=> authService.getCity())
        if(data!=null){
            yield put({
                type:'GET_ADDRESS',
                listAddress:data,
            })
        }

    }
    catch(err){
        console.log(err);
    }
}
export function* theoDoiGetAllAddress(){
    yield takeLatest("GET_ALL_ADDRESS_SAGA",getAllAddress)
}
function* getAllDistrict(){

    try{
        const {data}=yield call(()=> authService.getDistrict())
        if(data!=null){
            yield put({
                type:'GET_DISTRICT',
                listDistrict:data,
            })
        }

    }
    catch(err){
        console.log(err);
    }
}
export function* theoDoiGetAllDistrict(){
    yield takeLatest("GET_ALL_DISTRICT_SAGA",getAllDistrict)
}


function* getAllWard(){

    try{
        const {data}=yield call(()=> authService.getWards())
        if(data!=null){
            yield put({
                type:'GET_WARD',
                listWard:data,
            })
        }

    }
    catch(err){
        console.log(err);
    }
}
export function* theoDoiGetAllWard(){
    yield takeLatest("GET_ALL_WARD_SAGA",getAllWard)
}