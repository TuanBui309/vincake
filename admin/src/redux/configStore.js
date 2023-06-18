import {applyMiddleware, combineReducers, createStore} from 'redux';
import createMiddleWareSaga from 'redux-saga';
import LoadingReducer from './reducers/LoadingReducer';
import { drawerReducer } from './reducers/Drawer';
import {UsersReducers} from './reducers/UsersReducers';

import {CategoriesReducers} from './reducers/CategoriesReducer';
import {ProductReducers} from './reducers/ProductReducer';
import { BillReducers } from './reducers/BillReducers';
import { SupplierReducers } from './reducers/SupplierReducers';
import { StatusOrderReducers } from './reducers/StatusOrderReducers';
import { CustomerReducers } from './reducers/CustomerReducer';
import { NewsReducers } from './reducers/NewsReducers';
import { StatisticReducers } from './reducers/StatisticReducers';
import{ OrderReducers} from './reducers/OrderReducers'



import { rootSaga } from './sagas/rootSaga.js';
const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
    //reducer khai báo tại đây
    LoadingReducer,
    UsersReducers,
    CategoriesReducers,
    drawerReducer,
    ProductReducers,
    BillReducers,
    SupplierReducers,
    StatusOrderReducers,
    CustomerReducers,
    NewsReducers,
    StatisticReducers,
    OrderReducers,
   


    
})

const store = createStore(rootReducer,applyMiddleware(middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);


export default store;