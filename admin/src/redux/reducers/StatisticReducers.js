
import { THONG_KE_CHI_TIEU_THEO_NAM, THONG_KE_CHI_TIEU_THEO_THANG, THONG_KE_HOA_DON_BAN_DXL, THONG_KE_HOA_DON_BAN_DXL_THEO_THANG, THONG_KE_HOA_DON_NHAP_DXL, THONG_KE_THU_NHAP, THONG_KE_THU_NHAP_THEO_LOAI, THONG_KE_THU_NHAP_THEO_NAM, THONG_KE_THU_NHAP_THEO_THANG, THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL, THONG_KE_TOP_5_PRODUCT_BC } from "../constants/Statistic.js/Statistic";

const stateDefault = {
    listThuNhapTheoThang:[],
    listChiTieuTheoThang:[],
    listHBDBXLTheoThang:[],
    //theo nam
    listChiTieuTheoNam:[],
    listThuNhapTheoNam:[],
    listHDNDXLTheoNam:[],
    listHDBDXLTheoNam:[],
    //theo loai
    listThuNhapTheoLoai:[],

    //top 5
    listTop5Product:[],
    listTop5Customer:[],
   
}

export const StatisticReducers = (state = stateDefault,action) => {
    switch(action.type){
        case THONG_KE_CHI_TIEU_THEO_NAM: {
                state.listChiTieuTheoNam = action.listChiTieuTheoNam;
                console.log("qewqwe",action.listChiTieuTheoNam)
                return {...state};
        }
        case THONG_KE_HOA_DON_NHAP_DXL: {
            state.listHDNDXLTheoNam = action.listHDNDXLTheoNam;
            console.log("qewqwe",action.listHDNDXLTheoNam)
            return {...state};
    }
        case THONG_KE_THU_NHAP_THEO_NAM: {
            state.listThuNhapTheoNam = action.listThuNhapTheoNam;
            console.log("qewqwe",action.listThuNhapTheoNam)
            return {...state};
        }
        case THONG_KE_HOA_DON_BAN_DXL: {
            state.listHDBDXLTheoNam = action.listHDBDXLTheoNam;
            console.log("qewqwe",action.listHDBDXLTheoNam)
            return {...state};
        }
        //theo thang
        case THONG_KE_CHI_TIEU_THEO_THANG: {
            state.listChiTieuTheoThang = action.listChiTieuTheoThang;
            console.log("qewqwe",action.listChiTieuTheoThang)
            return {...state};
        }
        case THONG_KE_THU_NHAP_THEO_THANG: {
            state.listThuNhapTheoThang = action.listThuNhapTheoThang;
            console.log("qewqwe",action.listThuNhapTheoThang)
            return {...state};
        }
        case THONG_KE_HOA_DON_BAN_DXL_THEO_THANG: {
            state.listHBDBXLTheoThang = action.listHBDBXLTheoThang;
            console.log("qewqwe",action.listHBDBXLTheoThang)
            return {...state};
        }
        



        //theo loai

        case THONG_KE_THU_NHAP_THEO_LOAI: {
            state.listThuNhapTheoLoai = action.listThuNhapTheoLoai;
            console.log("qewqwe",action.listThuNhapTheoLoai)
            return {...state};
        }
        // top 5
        case THONG_KE_TOP_5_PRODUCT_BC: {
            state.listTop5Product = action.listTop5Product;
            console.log("qewqwe",action.listTop5Product)
            return {...state};
        }
        case THONG_KE_TOP_5_CUSTOMER_MAX_TOTAL: {
            state.listTop5Customer = action.listTop5Customer;
            console.log("qewqwe",action.listTop5Customer)
            return {...state};
        }
       

       
        default: return {...state}
    }
}