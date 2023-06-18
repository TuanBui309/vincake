import {applyMiddleware, combineReducers, createStore} from 'redux';
import LoadingReducer from './reducers/LoadingReducer';
import { HomeReducers } from './reducers/HomeReducers';
import { CommentReducers } from './reducers/CommentReducers';
import { AuthReducers } from './reducers/AuthReducers';

//middleware saga
import {CartReducers} from "./reducers/CartReducers";
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    //reducer khai báo tại đây
    LoadingReducer,
    HomeReducers,
    CartReducers,
    CommentReducers,AuthReducers


    
})

const store = createStore(rootReducer,applyMiddleware(middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);


export default store;

