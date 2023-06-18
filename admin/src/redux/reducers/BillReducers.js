import { EDIT_BILL, GET_ALL_BILLS, GET_ALL_PRODUCT_BILLS, GET_DETAIL_BILL_BY_ID } from "../constants/Bills/Bills";
import { GET_ALL_CATEGORIES } from "../constants/Categories/Categories";

const stateDefault = {
    listBill: [],
    listProductBill: [],
    listDetail: [],
    editBillModel: [],

}

export const BillReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_BILLS: {
            state.listBill = action.listBill;
            console.log("1asdasd", action.listBill)
            return { ...state };
        }
        case GET_ALL_PRODUCT_BILLS: {
            state.listProductBill = action.listProductBill;
            console.log("1asdasd", action.listProductBill)
            return { ...state };
        }
        case GET_DETAIL_BILL_BY_ID: {
            state.listDetail = action.listDetail;
            console.log("1asdasd", action.listDetail)
            return { ...state };

        }
        case EDIT_BILL:{
            state.editBillModel=action.editBillModel

        }




        default: return { ...state }
    }
}