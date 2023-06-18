import { call, delay,takeLatest, put } from 'redux-saga/effects';
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";



import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

import { STATUS_CODE } from '../../util/constants/settingSystem';

import { statusOrderServices } from '../../services/StatusOrderService';
function* getAllStatusOrder(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => statusOrderServices.getAllStatus());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_ALL_STATUS_ORDER',
                listStatus:data.content,
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
export function* theoDoiGetAllStatus(){
    yield takeLatest('GET_ALL_STATUS_ORDER_SAGA',getAllStatusOrder)
}
