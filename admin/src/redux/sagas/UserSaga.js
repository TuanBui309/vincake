import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';
import {AuthService1} from '../../services/AuthService'
import { DELETE_USER_SAGA, GET_ALL_USER, GET_ALL_USER_SAGA, INSERT_USER_SAGA, UPDATE_USER_SAGA, USER_SIGNIN_API, USLOGIN } from '../constants/User/User';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../util/constants/settingSystem'
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";


import { userService } from '../../services/UserService';



function* signinSaga(action) {
    console.log(action)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, message } = yield call(() => AuthService1.signinCyberBugs(action.userLogin));

        //Lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));


        yield put({
            type: USLOGIN,
            userLogin: data.content
        })
        console.log(data)
        window.location.replace('/user')
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
        console.log('',err.response.data);
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}
function* getAllUsers(action){
    console.log("keyword", action.keyWord);
    console.log(action)
    try{
        const {data,status}=yield call(()=>userService.getUser(action.keyWord));
        console.log(userService.getUser)
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_ALL_USER,
                listUser:data.content
            })
        }
    }
    catch(err){
        console.log(err.response)
    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiGetAllUser(){
    yield takeLatest(GET_ALL_USER_SAGA,getAllUsers)

}
function * deleteUsers(action){
    yield put({
        type:DISPLAY_LOADING
    })
    yield delay(300);
    try{
        const{data,status}=yield call(()=>userService.deleteUser(action.id))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message)
            yield put({type:GET_ALL_USER_SAGA,keyWord:''})
           
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    yield put({type:HIDE_LOADING})
}
export function* theoDoiDeleteUser(){
    yield takeLatest(DELETE_USER_SAGA,deleteUsers)
}
function* insertUsers(action){
    yield put({
        type:DISPLAY_LOADING
    })
    yield delay(300);
    console.log("â2",action.userModel)
    try{
        const{data,status}=yield call(()=>userService.insertUser(action.userModel))
        console.log("â1",data)
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message)
            yield put({type:GET_ALL_USER_SAGA,keyWord:''})
           
         
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    yield put({
        type: HIDE_LOADING
    })
    yield put({
        type:'CLOSE_DRAWER'
    })

}
export function* theoDoiInsertUsers(){
    yield takeLatest(INSERT_USER_SAGA,insertUsers)
}
function* UpdateUsers(action){
    yield put({
        type:DISPLAY_LOADING
    })
    yield delay(300);
    try{
        const{data,status}=yield call(()=>userService.updateUser(action.userModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message)
            yield put({type:GET_ALL_USER_SAGA,keyWord:''})
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
export function* theoDoiUpdateUsers(){
    yield takeLatest(UPDATE_USER_SAGA,UpdateUsers)
}
