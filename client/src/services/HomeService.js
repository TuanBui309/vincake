import { baseService } from "./baseService";
export class HomeService extends baseService{
    constructor(){
        super();
    }
    getAllCategories = () => {
        return this.get(`Home/getAllCategories`);
    }
    getAllProducts = (filter) => {
        return this.get(`Products/getproduct?keyword=${filter.keyWord}&filter=${filter.filters}`);
    }
    getProductDetail = (productIdModel) => {
        return this.get(`Home/getProductById?idProduct=${productIdModel}`);
    }
    getProductByIdCategory = (categoryId) => {
        return this.get(`Home/getProductByIdCategories?idCategories=${categoryId}`);
    }
    getAllNews = () => {
        return this.get(`News`);
    }
    //News/getNewsById?idNews=
    getNewsDetail = (newsId) => {
        return this.get(`News/getNewsById?idNews=${newsId}`);
    }
    history=()=>{
        return this.get(`Home/History`);
    }
    daiLaiDonHang=(datLaiModel)=>{
        return this.put(`Home/DatLai?idOrder=${datLaiModel.idOrder}&idStatus=${datLaiModel.idStatus}`)
    }
    huyDonHang=(orderModel1)=>{
       
        return this.put(`Home/HuyDonHang?idOrder=${orderModel1.idOrder}&idStatus=${orderModel1.idStatus}`);
    }
}
export const homeServices=new HomeService();