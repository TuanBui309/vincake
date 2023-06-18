import { GET_ALL_PRODUCT } from "../constants/Product/Product";

const stateDefault = {
    productList:[],
    editProduct:[],

}

export const ProductReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_PRODUCT: {
                state.productList = action.ProductData;
                console.log("qewqwe",action.ProductData)
                return {...state};
        }
        case 'EDIT_PRODUCT':{
            state.editProduct=action.ProductModel

        }

       
        default: return {...state}
    }
}