import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { homeServices } from '../../services/HomeService';
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

import{notifiFunction} from '../../util/Notification/notificationCyberbugs'
import { DAT_LAI_SAGA, GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_SAGA, GET_ALL_NEWS, GET_ALL_NEWS_DETAIL, GET_ALL_NEWS_DETAIL_SAGA, GET_ALL_NEWS_SAGA, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_SAGA, GET_LIST_HISTORY, GET_LIST_HISTORY_SAGA, GET_PRODUCT_BY_ID_CATEGORY_SAGA, GET_PRODUCT_DETAIL, HUY_DON_HANG_SAGA } from '../constants/Home';
function *getListCategories(action) { 

    try {
        const {data,status} = yield call( () => homeServices.getAllCategories());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_CATEGORIES,
                categoriesList:data.content
            })


         
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetAllCategoriesSaga() {
    yield takeLatest(GET_ALL_CATEGORIES_SAGA, getListCategories);
}
function *getListProducts(action) { 
    console.log(action)
    yield put(
        {
            type:DISPLAY_LOADING
        }
    )
    yield delay(300)

    try {
        const {data,status} = yield call( () => homeServices.getAllProducts(action.filter));
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_PRODUCTS,
                productList:data.content
            })


         
        }
    }catch(err) {
        console.log(err)
    }
    yield put(
        {
            type:HIDE_LOADING
        }
    )

}
function* getProductDetail(action){
    try {
        const {data,status} = yield call( () => homeServices.getProductDetail(action.productIdModel));
        console.log(action)
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'PUT_PRODUCT_DETAIL',
                productDetail:data.content
            })
          yield call(getProductDetail)


         
        }
    }catch(err) {
        console.log(err)
    }


}
export function* theoDoiGetProductDetail(){
    yield takeLatest(GET_PRODUCT_DETAIL,getProductDetail);
}


export function* theoDoiGetAllProductsSaga() {
    yield takeLatest(GET_ALL_PRODUCTS_SAGA, getListProducts);
}
function* getProductByIdCategories(action){
    try {
        const {data,status} = yield call( () => homeServices.getProductByIdCategory(action.categoryId));
        console.log(action)
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'PUT_PRODUCT_CATEGORY',
                productListByIdCategory:data.content
            })
          yield call(getProductDetail)


         
        }
    }catch(err) {
        console.log(err)
    }


}
export function* theoDoiGetProductByIdCategory(){
    yield takeLatest(GET_PRODUCT_BY_ID_CATEGORY_SAGA,getProductByIdCategories);
}
function *getAllNew(action) { 

    try {
        const {data,status} = yield call( () => homeServices.getAllNews());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_NEWS,
                newslist:data.content
            })
         
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetAllNewSaga() {
    yield takeLatest(GET_ALL_NEWS_SAGA, getAllNew);
}
function* getNewsDetails(action){
    try {
        const {data,status} = yield call( () => homeServices.getNewsDetail(action.newsId));
        console.log(action)
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_NEWS_DETAIL,
                newsDetail:data.content
            })
         


         
        }
    }catch(err) {
        console.log(err)
    }


}
export function* theoDoiGetNewsDetail(){
    yield takeLatest(GET_ALL_NEWS_DETAIL_SAGA,getNewsDetails);
}
function *getListHistory(action) { 

    try {
        const {data,status} = yield call( () => homeServices.history());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_LIST_HISTORY,
                listHistory:data.content
            })


         
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetListHistorySaga() {
    yield takeLatest(GET_LIST_HISTORY_SAGA, getListHistory);
}
function* datLai(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
    
            const { data, status } = yield call(() => homeServices.daiLaiDonHang(action.datLaiModel))
            
           if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.content)
            yield call(getListHistory);
            
           }
           
           



        




    }
    catch (err) {
        console.log(err.response.data)

    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiDatLaiDonHang() {
    yield takeLatest(DAT_LAI_SAGA, datLai);
}
function* huyDonHangs(action) {
    console.log('aaaaaa',action.orderModel1)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
    
            const { data, status } = yield call(() => homeServices.huyDonHang(action.orderModel1))
            console.log('abiad',data)
           if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.content)
            yield call(getListHistory);
         
            
           }
           
           



        




    }
    catch (err) {
        console.log(err.response.data)

    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiHuyDonHang() {
    yield takeLatest(HUY_DON_HANG_SAGA, huyDonHangs);
}