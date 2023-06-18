import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';
import {categoryService1} from '../../services/CategoriesService'

import { notifiFunction } from "../../util/Notification/notificationCyberbugs";



import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

import { STATUS_CODE } from '../../util/constants/settingSystem';
import { newsServices } from '../../services/NewService';
import { DELETE_NEWS_SAGA, GET_ALL_NEWS, GET_ALL_NEWS_SAGA, INSERT_NEWS_SAGA, UPDATE_NEWS_SAGA } from '../constants/News/News';



function* getAllNews(action) {
    console.log(action)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => newsServices.getNews());

      if(status===STATUS_CODE.SUCCESS){
       
        yield put({
            type: GET_ALL_NEWS,
            listNews: data.content
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
export function* theoDoiGetAllNews() {
    yield takeLatest(GET_ALL_NEWS_SAGA, getAllNews);
}
function* insertNews(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>newsServices.insertNews(action.newsModel))
        if(status===STATUS_CODE.SUCCESS){
           
            notifiFunction('success',data.message)

            yield getAllNews();

        }
        yield call(getAllNews);
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
function* deleteNews(action){
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => newsServices.deleteNews(action.id));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getAllNews);
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
function* updateNews(action){
    yield put({
        type:DISPLAY_LOADING
    })
    delay(500)
    try{
        const {data,status}=yield call(()=>newsServices.updateNews(action.newsModel))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getAllNews);
        yield put({
            type:'CLOSE_DRAWER'
        })

    }
    catch(err){
        console.log(err.response)
    }
}
export function* theoDoiUpdateNews(){
    yield takeLatest(UPDATE_NEWS_SAGA,updateNews)
}

export function* theoDoiInsertNews() {
    yield takeLatest(INSERT_NEWS_SAGA, insertNews);
}
export function* theoDoiDeleteNews()
{
    yield takeLatest(DELETE_NEWS_SAGA,deleteNews);
}