import { baseService } from "./baseService";


export class BillService extends baseService {

    constructor(){
        super();
    }
    

    getAllBill = () => {
        
       return this.get(`Bill`);
    }
    getDetailById = (billId) => {
        
        return this.get(`Bill/getBillDetailById?idBills=${billId}`);
     }
    getAllProductBill = () => {
        
        return this.get(`Bill/getAllProductBil`);
     }


    insertProductBill = (productModel) => {
        return this.post(`Bill/addProductBill`,productModel);
    }
    insertNewProductBill = (newProductModel) => {
        return this.post(`Bill/addNewProductBill`,newProductModel);
    }
    insertBill = (billModel) => {
        return this.post(`Bill/addBill`,billModel);
    }


    deleteBill1 = (id) => {
        return this.delete(`Bill/deleteBill?idBill=${id}`);
    } 
    deleteProductBill = (idProduct) => {
        return this.delete(`Bill/deleteProductBill?idProduct=${idProduct}`);
    } 
    deleteAllProductBill = () => {
        return this.delete(`Bill/deleteAllProductBill`);
    } 
    deleteDetailBill = (detailId) => {
        return this.delete(`Bill/deleteDetail?idDetail=${detailId}`);
    } 
    updateBill=(billModel)=>{
        return this.put(`Bill/updateBills`,billModel)
    }


   
}


export const billService = new BillService();
