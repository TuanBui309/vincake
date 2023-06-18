import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';

import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../constants/Comment";
import{notifiFunction} from '../../util/Notification/notificationCyberbugs'

import { cmtService } from '../../services/CommentService';
import { GET_PRODUCT_DETAIL } from '../constants/Home';
function *getListComment(action) { 

    try {
        const {data,status} = yield call( () => cmtService.getAllCmtById(action.productId));
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_COMMENT,
                categoriesList:data.content
            })


         
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetAllCommetSaga() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getListComment);
}
function* inserComments(action) {
    console.log(action)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
    
            const { data, status } = yield call(() => cmtService.insertComMent(action.cmtInserModel))
            console.log('abiad',data)
           if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message)
            yield put({
                type:GET_PRODUCT_DETAIL,
                productIdModel:action.cmtInserModel.productId
            })
            
         
            
           }
           
           



        




    }
    catch (err) {
        console.log(err.response.data)

    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiInserComment() {
    yield takeLatest(INSERT_COMMENT_SAGA, inserComments);
}
function* UpdateComments(action) {
    
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
    
            const { data, status } = yield call(() => cmtService.updateComment(action.cmtUpdateMOdel))
            console.log('abiad',data)
           if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message)
            yield put({
                type:GET_PRODUCT_DETAIL,
                productIdModel:action.cmtUpdateMOdel.productId
            })
            
         
            
           }
           
           



        




    }
    catch (err) {
        console.log(err.response.data)

    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiUpdateCommentsSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, UpdateComments);
}
function* DeleteComments(action) {
    
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
    
            const { data, status } = yield call(() => cmtService.deleteComment(action.idComment))
            console.log('abiad',data)
           if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.content)
            yield put({
                type:GET_PRODUCT_DETAIL,
                productIdModel:action.productId
            })
            
         
            
           }
           
           



        




    }
    catch (err) {
        console.log(err.response.data)

    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiDeleteCommentsSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, DeleteComments);
}

