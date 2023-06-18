import { GET_ALL_CATEGORIES, GET_ALL_NEWS, GET_ALL_NEWS_DETAIL, GET_ALL_PRODUCTS, GET_LIST_HISTORY } from "../constants/Home";

const stateDefault = {
    categoriesList: [],
    productsList: [],
    newsList:[],
    productDetail: {

    },
    editDonHang:[],
    newsDetail: [],
    user1:{},
    productListByIdCategory:[],
    related:[],
    lstComment:[],
    listAddress: [],
    listDistrict: [],
    listWard: [],

    listHistory:[]


}

export const HomeReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES: {
            state.categoriesList = action.categoriesList;
            console.log("1asdasd", action.categoriesList)
            return { ...state };
        }
        case GET_ALL_PRODUCTS: {
            state.productsList = action.productList;
            
            return { ...state };
        }
        case GET_ALL_NEWS: {
            state.newslist = action.newslist;
            
            return { ...state };
        }
        case GET_LIST_HISTORY: {
            state.listHistory = action.listHistory;
            
            return { ...state };
        }
        case 'PUT_PRODUCT_DETAIL': {
            state.productDetail = action.productDetail;
            state.related=action.productDetail.related;
            state.lstComment=action.productDetail.lstComment;
            
            return { ...state }
        }
        case GET_ALL_NEWS_DETAIL: {
            state.newsDetail = action.newsDetail;
            state.user1=action.newsDetail.user1
        
            
            return { ...state }
        }
        case 'PUT_PRODUCT_CATEGORY': {
            state.productListByIdCategory = action.productListByIdCategory;
            console.log("1asdasd", action.productListByIdCategory)
            
            
            return { ...state }
        }
        case 'GET_ADDRESS': {
            state.listAddress = action.listAddress;
            
            return { ...state };
        }
        case 'GET_DISTRICT': {
            state.listDistrict = action.listDistrict;
            
            return { ...state };
        }
        case 'GET_WARD': {
            state.listWard = action.listWard;
           
            return { ...state };
        }
        case 'EDIT_DONHANG':{
            state.editDonHang=action.editDonHang

        }
        default: return { ...state }
    }
}