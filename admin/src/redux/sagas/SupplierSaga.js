import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';


import { notifiFunction } from "../../util/Notification/notificationCyberbugs";



import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { DELETE_CATEGORIES_SAGA, GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_SAGA, INSERT_CATEGORIES_SAGA, UPDATE_CATEGORIES_SAGA } from '../constants/Categories/Categories';
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { supplierServices } from '../../services/SupplierService';
import { DELETE_SUPPLIER_SAGA, GET_ALL_SUPPLIER, GET_ALL_SUPPLIER_SAGA, INSERT_SUPPLIER_SAGA, UPDATE_SUPPLIER_SAGA } from '../constants/Supplier/Supplier';



function* getAllSupplier(action) {
    console.log(action)
 
   
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => supplierServices.getSupplier());

        //Lưu vào localstorage khi đăng nhập thành công
        console.log('data',data)
      


        yield put({
            type: GET_ALL_SUPPLIER,
            listSupplier: data.content
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
export function* theoDoiGetAllSupplier() {
    yield takeLatest(GET_ALL_SUPPLIER_SAGA, getAllSupplier);
}
function* insertSupplier(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>supplierServices.insertSupplier(action.supplierModel))
        if(status===STATUS_CODE.SUCCESS){
           
            alert('asdasdasd');

          
        }
        yield call(getAllSupplier);
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
function* delateSupplier(action){
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => supplierServices.deleteSupplier(action.id));
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
        yield call(getAllSupplier);
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
function* updateSupplier(action){
    yield put({
        type:DISPLAY_LOADING
    })
    delay(500)
    try{
        const {data,status}=yield call(()=>supplierServices.updateSupplier(action.supplierModel))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success',data.message)

            // history.push('/projectmanagement');
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getAllSupplier);
        yield put({
            type:'CLOSE_DRAWER'
        })

    }
    catch(err){
        console.log(err.response)
    }
}
export function* theoDoiUpdateSupplier(){
    yield takeLatest(UPDATE_SUPPLIER_SAGA,updateSupplier)
}

export function* theoDoiInsertSupplier() {
    yield takeLatest(INSERT_SUPPLIER_SAGA, insertSupplier);
}
export function* theoDoiDeleteSupplier()
{
    yield takeLatest(DELETE_SUPPLIER_SAGA,delateSupplier);
}