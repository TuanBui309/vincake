import { GET_ALL_CART } from "../constants/Cart";
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS } from "../constants/Home";

const stateDefault = {
    listCart:[],
    

}

export const CartReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_CART: {
                state.listCart = action.listCart;
                console.log("1asdasd",action.listCart)
                return {...state};
        }
        
        default: return {...state}
    }
}