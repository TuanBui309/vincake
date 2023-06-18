import { GET_ALL_CUSTOMER } from "../constants/Customer/Customer";


const stateDefault = {
    listCustomer:[],
    editCustomer:[],

}

export const CustomerReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_CUSTOMER: {
                state.listCustomer = action.listCustomer;
                console.log("qewqwe",action.listCustomer)
                return {...state};
        }
        case 'EDIT_CUSTOMER':{
            state.editCustomer=action.editCustomer

        }

       
        default: return {...state}
    }
}