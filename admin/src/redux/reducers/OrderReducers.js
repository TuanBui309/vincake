import { GET_ALL_CATEGORIES } from "../constants/Categories/Categories";
import { GET_ALL_ORDER } from "../constants/Order/Order";

const stateDefault = {
    orderList:[],
    editOrder:[],

}

export const OrderReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_ORDER: {
                state.orderList = action.orderList;
                console.log("1asdasd",action.orderList)
                return {...state};
        }
        case 'EDIT_ORDER':{
            state.editOrder=action.editOrder

        }

       
        default: return {...state}
    }
}