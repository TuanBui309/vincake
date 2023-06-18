import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';
import {categoryService1} from '../../services/CategoriesService'

import { notifiFunction } from "../../util/Notification/notificationCyberbugs";


import { userService } from '../../services/UserService';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { DELETE_CATEGORIES_SAGA, GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_SAGA, INSERT_CATEGORIES_SAGA, UPDATE_CATEGORIES_SAGA } from '../constants/Categories/Categories';
import { STATUS_CODE } from '../../util/constants/settingSystem';



function* getAllCategories(action) {
    console.log(action)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => categoryService1.getCategories());

        //Lưu vào localstorage khi đăng nhập thành công
        console.log('data',data)
      


        yield put({
            type: GET_ALL_CATEGORIES,
            categoriesData: data.content
        })
        
    

        // let history = yield select(state=> state.HistoryReducer.history)

      

    } catch (err) {
      
        notifiFunction('error',err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })

}
export function* theoDoiGetAllCategories() {
    yield takeLatest(GET_ALL_CATEGORIES_SAGA, getAllCategories);
}
function* insertCategories(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>categoryService1.insertCategory(action.Categories))
        if(status===STATUS_CODE.SUCCESS){
           
            notifiFunction('success',data.message)

            yield getAllCategories();

        }
        yield call(getAllCategories);
        yield put({
            type:'CLOSE_DRAWER'
        })

    }
    catch(err){
        console.log(err.response)


    }
    yield put({
        type: HIDE_LOADING

    })

}
function* delateCategories(action){
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => categoryService1.deleteCategory(action.id));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }else {
            notifiFunction('error','Delete project fail !')
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getAllCategories);
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
function* updateCategories(action){
    yield put({
        type:DISPLAY_LOADING
    })
    delay(500)
    try{
        const {data,status}=yield call(()=>categoryService1.updateCategory(action.Categories))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }else {
            notifiFunction('error','Delete project fail !')
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getAllCategories);
        yield put({
            type:'CLOSE_DRAWER'
        })

    }
    catch(err){
        console.log(err.response)
    }
}
export function* theoDoiUpdateCategories(){
    yield takeLatest(UPDATE_CATEGORIES_SAGA,updateCategories)
}

export function* theoDoiInsertCategories() {
    yield takeLatest(INSERT_CATEGORIES_SAGA, insertCategories);
}
export function* theoDoiDeleteCategories()
{
    yield takeLatest(DELETE_CATEGORIES_SAGA,delateCategories);
}