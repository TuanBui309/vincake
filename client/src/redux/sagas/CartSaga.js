import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';

import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import{notifiFunction} from '../../util/Notification/notificationCyberbugs'
import { CUSTOMER_SIGNIN_API, USLOGIN } from '../constants/Customer';
import { cartService } from '../../services/CartService';
import { GET_ALL_CART, GET_ALL_CART_SAGA } from '../constants/Cart';
function* addToCart(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
        if (localStorage.getItem(USER_LOGIN) == null) {
            window.location.replace('/dangnhap')

        }
        else {
            const { data, status } = yield call(() => cartService.addToCart(action.cart))
            
           if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success',"Đã Thêm sản phẩm vào giỏ hàng")
            yield call(getAllCart)
           }
           




        }




    }
    catch (err) {
        notifiFunction('error',err.response.data.content);
        console.log(err.response.data)

    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiAddToCart() {
    yield takeLatest("ADD_TO_CART_SAGA", addToCart);
}
function* getAllCart(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try{
        const { data, status } = yield call(() => cartService.getAllCarts())
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_ALL_CART,
                listCart:data.content,
               
                
                
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
export function* theoDOiGetAllCart(){
    yield takeLatest(GET_ALL_CART_SAGA,getAllCart);
}
function* ChangeQuantity(action){
    try{
        
        const {data,status}=yield call(()=>cartService.changeQuantity1(action.cartModel));
        if(status==STATUS_CODE.SUCCESS){
           
            yield call(getAllCart)
           
        }
        else{
            alert("loi")
        }
    }
    catch(err){
        notifiFunction('error',err.response.data.content);
        console.log(err.response)
    }
}
export function* theoDoiChangeQuantity(){
    yield takeLatest("CHANGE_QUANTITY_SAGA",ChangeQuantity);
}
function* DeleteCart(action){
    try{
        const {data,status}=yield call(()=>cartService.deleteCart(action.cartId));
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success','Xoa thanh cong');
            yield call(getAllCart);
        }

    }
    catch(err){
        notifiFunction('error',err.response.data.content)
    }
}
export function* theoDoiDeleteCart(){
    yield takeLatest("DELETE_CART_SAGA",DeleteCart)
}