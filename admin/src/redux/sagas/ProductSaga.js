import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';
import {productService} from '../../services/ProductsService'

import { notifiFunction } from "../../util/Notification/notificationCyberbugs";


import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

import { STATUS_CODE } from '../../util/constants/settingSystem';
import { DELETE_PRODUCT_SAGA, GET_ALL_PRODUCT, GET_ALL_PRODUCT_SAGA, INSERT_PRODUCT_SAGA, UPDATE_PRODUCT_SAGA } from '../constants/Product/Product';
import { DELETE_CATEGORIES_SAGA } from '../constants/Categories/Categories';



function* getAllProduct(action) {
    console.log(action)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => productService.getProducts(action.filter));

        //Lưu vào localstorage khi đăng nhập thành công
        console.log('data',data)
      


        yield put({
            type: GET_ALL_PRODUCT,
            ProductData: data.content
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
export function* theoDoiGetAllProduct() {
    yield takeLatest(GET_ALL_PRODUCT_SAGA, getAllProduct);
}
function* insertProduct(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>productService.insertProduct(action.ProductModel))
        if (status === STATUS_CODE.SUCCESS) {
            console.log("actione",action)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }else {
            notifiFunction('error','Delete project fail !')
        }
        yield put({
            type: GET_ALL_PRODUCT_SAGA,
            filter: {
              keyWord: '',
              filters: ''


            }

          });
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
function* delateProduct(action){
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => productService.deleteProduct(action.id));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield put({
            type: GET_ALL_PRODUCT_SAGA,
            filter: {
              keyWord: '',
              filters: ''


            }

          });
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
function* updateProduct(action){
    yield put({
        type:DISPLAY_LOADING
    })
    delay(500)
    try{
        const {data,status}=yield call(()=>productService.updateProduct(action.ProductModel))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }else {
            notifiFunction('error','Delete project fail !')
        }
        yield put({
            type: GET_ALL_PRODUCT_SAGA,
            filter: {
              keyWord: '',
              filters: ''


            }

          });
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
export function* theoDoiUpdateProduct(){
    yield takeLatest(UPDATE_PRODUCT_SAGA,updateProduct)
}

export function* theoDoiInsertProduct() {
    yield takeLatest(INSERT_PRODUCT_SAGA, insertProduct);
}
export function* theoDoiDeleteProduct()
{
    yield takeLatest(DELETE_PRODUCT_SAGA,delateProduct);
}