import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';
import {AuthService1} from '../../services/AuthService'
import { DELETE_CUSTOMER_SAGA, GET_ALL_CUSTOMER, GET_ALL_CUSTOMER_SAGA, INSERT_CUSTOMER_SAGA, UPDATE_CUSTOMER_SAGA } from '../constants/Customer/Customer';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { STATUS_CODE, TOKEN, Customer_LOGIN } from '../../util/constants/settingSystem'
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";


import { customerService } from '../../services/CustomerService';





function* getAllCustomers(action){
    try{
        const {data,status}=yield call(()=>customerService.getCustomer(action.keyWord));
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_ALL_CUSTOMER,
                listCustomer:data.content
            })
        }
    }
    catch(err){
        console.log(err.response)
    }
}
export function* theoDoiGetAllCustomer(){
    yield takeLatest(GET_ALL_CUSTOMER_SAGA,getAllCustomers)

}
function * deleteCustomers(action){
    yield put({
        type:DISPLAY_LOADING
    })
    try{
        const{data,status}=yield call(()=>customerService.deleteCustomer(action.id))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message)
            yield put({type:GET_ALL_CUSTOMER_SAGA,keyWord:''})
            
        }
    }
    catch(err){
        notifiFunction("success",err.response.data.message)
    }
    yield put({type:HIDE_LOADING})
}
export function* theodoiDeleteCustomer(){
    yield takeLatest(DELETE_CUSTOMER_SAGA,deleteCustomers)
}
function* insertCustomers(action){
    yield put({
        type:DISPLAY_LOADING
    })
    try{
        const{data,status}=yield call(()=>customerService.insertCustomer(action.customerModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message)
            yield put({type:GET_ALL_CUSTOMER_SAGA,keyWord:''})
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    yield put({type:HIDE_LOADING})
    yield put({
        type:'CLOSE_DRAWER'
    })

}
export function* theoDoiInsertCustomers(){
    yield takeLatest(INSERT_CUSTOMER_SAGA,insertCustomers)
}
function* UpdateCustomers(action){
    yield put({
        type:DISPLAY_LOADING
    })
    try{
        const{data,status}=yield call(()=>customerService.updateCustomer(action.customerModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message)
            yield put({type:GET_ALL_CUSTOMER_SAGA,keyWord:''})
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    yield put({type:HIDE_LOADING})
    yield put({
        type:'CLOSE_DRAWER'
    })

}
export function* theoDoiUpdateCustomers(){
    yield takeLatest(UPDATE_CUSTOMER_SAGA,UpdateCustomers)
}
