import { call, delay,takeLatest, put } from 'redux-saga/effects';
// import { cyberbugsService } from '../../../services/CyberbugsService';


import { notifiFunction } from "../../util/Notification/notificationCyberbugs";



import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

import { STATUS_CODE } from '../../util/constants/settingSystem';
import {  billService } from '../../services/BillService';
import { DELETE_ALL_PRODUCT_BILLS, DELETE_BILLS_SAGA, DELETE_PRODUCT_BILLS, DETAIL_Detail_BILLS_SAGA, GET_ALL_BILLS, GET_ALL_BILLS_SAGA, GET_ALL_PRODUCT_BILLS, GET_ALL_PRODUCT_BILLS_SAGA, GET_DETAIL_BILL_BY_ID_SAGA, INSERT_BILLS_SAGA, INSERT_NEWPRODUCTBILL_SAGA, INSERT_PRODUCTBILL_SAGA, UPDATE_BILL_SAGA } from '../constants/Bills/Bills';
import { GET_DETAIL_BILL_BY_ID } from '../constants/Bills/Bills';
function* getAllBills(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => billService.getAllBill());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_BILLS,
                listBill:data.content,
            })
           
        }

    }

    catch (err) {
        console.log('', err.response.data);
        notifiFunction('error', err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })
}
export function* theoDoiGetAllBills(){
    yield takeLatest(GET_ALL_BILLS_SAGA,getAllBills)
}







//delete bill
function* deleteBills(action){
    yield put({
        type:DISPLAY_LOADING,
    })
    yield delay(500)
    try{
        console.log(action)
        const {data,status}=yield call(()=>billService.deleteBill1(action.id))
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message);
            yield call(getAllBills);
             
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    yield put({
        type:HIDE_LOADING
    })
}
export function* theoDoiDeleteBill(){
    yield takeLatest(DELETE_BILLS_SAGA,deleteBills);
}


//add bill
function* addBill(action){
    yield put({
        type:DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>billService.insertBill(action.billModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message);
            yield call(getAllBills);
        }

    }
    catch(err){
        notifiFunction(err.response.data.mesage);
    }
}
export function* theoDoiAddBills(){
    yield takeLatest(INSERT_BILLS_SAGA,addBill);
}

//product Bill

//get all product bills

function* getAllProductBills(){
    try{
        const {data,status}=yield call(()=>billService.getAllProductBill())
        if(status===STATUS_CODE.SUCCESS){
           
            yield put({
                type:GET_ALL_PRODUCT_BILLS,
                listProductBill:data.content
            })
        }
    }
    catch(err){
        notifiFunction(err.response.data.message)
    }
}
export function* theoDoiGetAllProductBills(){
    yield takeLatest(GET_ALL_PRODUCT_BILLS_SAGA,getAllProductBills)
}
//add product bill

function* inserProductBills(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>billService.insertProductBill(action.productModel))
        console.log("action",action)
        console.log("prodct",data)
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message);
            yield call(getAllProductBills);
        }
    }
    catch(err){
        notifiFunction('error', err.response.data.message)
    }
    yield put({
        type:HIDE_LOADING,
    })


}
export function* theoDoiInsertProductBill(){
    yield takeLatest(INSERT_PRODUCTBILL_SAGA,inserProductBills)
}
function* inserNewProductBills(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>billService.insertNewProductBill(action.newProductModel))
        console.log(action)
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message);
            yield call(getAllProductBills);
        }
    }
    catch(err){
        notifiFunction('error', err.response.data.message)
        
    }
    yield put({
        type:HIDE_LOADING,
    })


}
export function* theoDoiInsertNewProductBill(){
    yield takeLatest(INSERT_NEWPRODUCTBILL_SAGA,inserNewProductBills)
}


//delete Product Bills
function* deleteProductBills(action){
    
    yield delay(500)
    try{
        console.log(action)
        const {data,status}=yield call(()=>billService.deleteProductBill(action.idProduct))
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message);
            yield call(getAllProductBills);
             
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    
}
export function* theoDoiDeleteProductBill(){
    yield takeLatest(DELETE_PRODUCT_BILLS,deleteProductBills);
}

//delete all Product Bills
function* deleteAllProductBills(action){
    yield put({
        type:DISPLAY_LOADING,
    })
    yield delay(500)
    try{
        console.log(action)
        const {data,status}=yield call(()=>billService.deleteAllProductBill())
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
           
            yield call(getAllProductBills);
             
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    yield put({
        type:HIDE_LOADING
    })
}
export function* theoDoiDeleteAllProductBill(){
    yield takeLatest(DELETE_ALL_PRODUCT_BILLS,deleteAllProductBills);
}
function* updateBills(action){
    yield put({
        type:DISPLAY_LOADING
    })
    yield delay(500);
    try{
        const {data,status}=yield call(()=>billService.updateBill(action.billModel))
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction("success",data.message);
            yield call(getAllBills);
        }
        else{

        }
    }
    catch(err){
        notifiFunction("error",err.response.data.content);
    }
    yield put({
        type:'CLOSE_DRAWER'
    })
    yield put({
        type:HIDE_LOADING
    })
   
}
//bill detail
export function* theoDoiUpdateBills(){
    yield takeLatest(UPDATE_BILL_SAGA,updateBills);
}
function* getAllDetailByIdBills(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => billService.getDetailById(action.billId));
        console.log('detali',data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_DETAIL_BILL_BY_ID,
                listDetail:data.content,
            })
           
        }

    }

    catch (err) {
        console.log('', err.response.data);
        notifiFunction('error', err.response.data.message)
    }


    yield put({
        type: HIDE_LOADING

    })
}
export function* theoDoiGetAllDetailByIdBills(){
    yield takeLatest(GET_DETAIL_BILL_BY_ID_SAGA,getAllDetailByIdBills)
}
function* deleteDetailBills(action){
    yield put({
        type:DISPLAY_LOADING,
    })
    yield delay(500)
    try{
        console.log(action)
        const {data,status}=yield call(()=>billService.deleteBill1(action.detailId))
        console.log(data)
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',data.message);
            yield call(getAllDetailByIdBills);
             
        }
    }
    catch(err){
        notifiFunction("error",err.response.data.message)
    }
    yield put({
        type:HIDE_LOADING
    })
}
export function* theoDoiDeleteDetailBill(){
    yield takeLatest(DETAIL_Detail_BILLS_SAGA,deleteDetailBills);
}
