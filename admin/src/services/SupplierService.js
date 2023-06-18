import { baseService } from "./baseService";


export class SupplierService extends baseService {

    constructor(){
        super();
    }
    

    getSupplier = () => {
        
       return this.get(`Supplier`);
    }


    insertSupplier = (supplierModel) => {
        return this.post(`Supplier/insertSupplier`,supplierModel);
    }


    deleteSupplier= (id) => {
        return this.delete(`Supplier/deleteSupplier?idSupplier=${id}`);
    } 


   
    updateSupplier = (supplierModel) => {
        return this.put(`Supplier/updateSupplier`,supplierModel);
    } 
}


export const supplierServices = new SupplierService();
