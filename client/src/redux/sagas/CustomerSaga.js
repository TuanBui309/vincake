import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';

import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { authService } from '../../services/AuthService';
import { CUSTOMER_SIGNIN_API, CUSTOMER_SIGNIUP_SAGA, FORGET_PASSWORD_SAGA, GET_USER_BY_ID, GET_USER_BY_ID_SAGA, RESET_PASSWORD_SAGA, USLOGIN } from '../constants/Customer';
import { notifiFunction } from '../../util/Notification/notificationCyberbugs';



function * signinSaga(action){
    try{
        const {data,status}=yield call(()=>authService.signin(action.userLogin))
        localStorage.setItem(TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        yield put({
            type:USLOGIN,
            userLogin:data.content,
        })


        window.location.replace('/')
       


    }
    catch(err){
        console.log(err.response.data)

    }

}









export function* theoDoiSignin() {
    yield takeLatest(CUSTOMER_SIGNIN_API, signinSaga);
}


function * signUpSaga(action){
    try{
        const {data,status}=yield call(()=>authService.signup(action.customerModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message)
            window.location.replace('/dangnhap')

        }
       


    }
    catch(err){
        console.log(err.response.data)

    }

}


export function* theoDoiSignup() {
    yield takeLatest(CUSTOMER_SIGNIUP_SAGA, signUpSaga);
}
function * forgetPasswordSaga(action){
    yield put({
        type:DISPLAY_LOADING,
    })
    yield delay(500)
    try{
        const {data,status}=yield call(()=>authService.ForgetPassword(action.customerModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message)
            window.location.replace('/resetpassword')

        }
       


    }
    catch(err){
        console.log(err.response.data)

    }
    yield put({
        type:HIDE_LOADING,
    })

}

export function* theoDoiForgetPassword() {
    yield takeLatest(FORGET_PASSWORD_SAGA, forgetPasswordSaga);
}


function * ResetPasswordSaga(action){
    try{
        const {data,status}=yield call(()=>authService.resetPassword(action.customerModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message)
            window.location.replace('/dangnhap')

        }
       


    }
    catch(err){
        console.log(err.response.data)

    }

}

export function* theoDoiResetPassword() {
    yield takeLatest(RESET_PASSWORD_SAGA, ResetPasswordSaga);
}

function * getUserByIdSaga(action){
    yield put({
        type:DISPLAY_LOADING,
    })
    yield delay(500)
    try{
        const {data,status}=yield call(()=>authService.GetUserByid(action.idUser))
        if(status===STATUS_CODE.SUCCESS){
           yield put(
            {
                type:GET_USER_BY_ID,
                listUser:data.content
            }
           )

        }
       


    }
    catch(err){
        console.log(err.response.data)

    }
    yield put({
        type:HIDE_LOADING,
    })

}
export function* theoDoiGetUserById(){
    yield takeLatest(GET_USER_BY_ID_SAGA,getUserByIdSaga)
}
function * editCustomerSaga(action){
    yield put({
        type:DISPLAY_LOADING,
    })
    yield delay(500)
    try{
        const {data,status}=yield call(()=>authService.EditCustomer(action.customerModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message)
          
          

        }
       


    }
    catch(err){
        console.log(err.response.data)

    }
    yield put({
        type:HIDE_LOADING,
    })

}
export function* theoDoiEditCustomer(){
    yield takeLatest('EDIT_CUSTOMER_SAGA',editCustomerSaga)
}