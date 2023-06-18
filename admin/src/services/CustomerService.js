import { baseService } from "./baseService";
import { Axios } from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem"

export class CustomerService extends baseService {

    constructor(){
        super();
    }
   

    getCustomer = (keyWord) => {
        
       return this.get(`Customer/getCustomer?keyword=${keyWord}`);
    }
    insertCustomer = (customerModel) => {
        return this.post(`Customer/signup`,customerModel);
    }


    deleteCustomer= (id) => {
        return this.delete(`Customer/deleteCustomer?id=${id}`);
    } 


   
    updateCustomer = (customerModel) => {
        return this.put(`Customer/editCustomer`,customerModel);
    } 


    


}


export const customerService = new CustomerService();
