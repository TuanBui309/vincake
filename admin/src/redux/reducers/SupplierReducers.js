import { GET_ALL_CATEGORIES } from "../constants/Categories/Categories";
import { GET_ALL_SUPPLIER } from "../constants/Supplier/Supplier";

const stateDefault = {
    listSupplier:[],
    editSupplier:[],

}

export const SupplierReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_SUPPLIER: {
                state.listSupplier = action.listSupplier;
                console.log("1asdasd",action.listSupplier)
                return {...state};
        }
        case 'EDIT_SUPPLIER':{
            state.editSupplier=action.editSupplier

        }

       
        default: return {...state}
    }
}