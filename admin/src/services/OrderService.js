import { baseService } from "./baseService";


export class OrderService extends baseService {

    constructor(){
        super();
    }
    

    getAllOrder = () => {
        
       return this.get(`OrderController1`);
    }
   
   


    deleteOrder = (id) => {
        return this.delete(`OrderController1/deleteOrder?idOrder=${id}`);
    } 
   
    updateOrder=(orderModel)=>{
        return this.put(`OrderController1/updateOrders`,orderModel)
    }


   
}


export const orderServices = new OrderService();
