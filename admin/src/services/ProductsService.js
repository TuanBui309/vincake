import { baseService } from "./baseService";


export class ProductsService extends baseService {

    constructor(){
        super();
    }
    

    getProducts = (filter) => {
        
        return this.get(`Products/getproduct?keyword=${filter.keyWord}&filter=${filter.filters}`);
    }


    insertProduct = (ProductsModel) => {
        return this.post(`Products/insertProduct`,ProductsModel);
    }


    deleteProduct = (id) => {
        return this.delete(`/Products/deleteProduct?idProDuct=${id}`);
    } 


    getUserByProductId = (idCategories) =>{ 
        return this.get(`/Products/getProductById?idProduct=${idCategories}`)
    }
    updateProduct = (ProductsModel) => {
        return this.put(`Products/updateProduct?`,ProductsModel);
    } 
}


export const productService = new ProductsService();
