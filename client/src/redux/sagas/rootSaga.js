import { all } from "redux-saga/effects";
import * as HomeSaga from "./HomeSaga"
import * as CustomerSaga from "./CustomerSaga"
import * as CartSaga from "./CartSaga"
import * as CheckOutSaga from "./CheckOutSaga"
import * as CommentSaga from "./CommentSaga"

export function * rootSaga(){
  yield all([
    HomeSaga.theoDoiGetAllCategoriesSaga(),
    HomeSaga.theoDoiGetAllProductsSaga(),
    HomeSaga.theoDoiGetProductByIdCategory(),
    HomeSaga.theoDoiGetAllNewSaga(),
    HomeSaga.theoDoiGetNewsDetail(),
    HomeSaga.theoDoiGetListHistorySaga(),
    HomeSaga.theoDoiHuyDonHang(),
    HomeSaga.theoDoiDatLaiDonHang(),
    
    HomeSaga.theoDoiGetProductDetail(),
    //
    CustomerSaga.theoDoiSignin(),
    CustomerSaga.theoDoiForgetPassword(),
    CustomerSaga.theoDoiResetPassword(),
    CustomerSaga.theoDoiEditCustomer(),
    CustomerSaga.theoDoiGetUserById(),
    CustomerSaga.theoDoiSignup(),




    CartSaga.theoDoiAddToCart(),
    CartSaga.theoDOiGetAllCart(),
    CartSaga.theoDoiChangeQuantity(),
    CartSaga.theoDoiDeleteCart(),


    CheckOutSaga.theoDoiAddOrder(),
    CheckOutSaga.theoDoiGetAllAddress(),
    CheckOutSaga.theoDoiGetAllDistrict(),
    CheckOutSaga.theoDoiGetAllWard(),

    //cmt
    CommentSaga.theoDoiDeleteCommentsSaga(),
    CommentSaga.theoDoiGetAllCommetSaga(),
    CommentSaga.theoDoiInserComment(),
    CommentSaga.theoDoiUpdateCommentsSaga(),


    
    

  ])
}

























// import { all } from "redux-saga/effects";
// import Todolist from "../../pages/Todolist/Todolist";
// import TodolistRFC from "../../pages/Todolist/TodolistRFC";
// import * as ToDoListSaga from './ToDoListSaga'
// // import {theoDoiActionGetTaskApi} from './ToDoListSaga'
// import * as Cyberbugs from './Userbug';


// export function* rootSaga() {

//   yield all([
//     //Nghiệp vụ theo dõi các action saga todolist
//     ToDoListSaga.theoDoiActionGetTaskApi(),
//     ToDoListSaga.theoDoiActionAddTaskApi(),
//     ToDoListSaga.theoDoiActionDeleteTask(),
//     ToDoListSaga.theoDoiDoneTask(),
//     ToDoListSaga.theoDoiRejectTask(),
    
//     //Nghiệp vụ cyberbugs .... ,
//     Cyberbugs.theoDoiSignin(),
   
    
    
//   ])


