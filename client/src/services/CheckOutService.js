import { baseService } from "./baseService";
export class CheckOutService extends baseService{
    constructor(){
        super();
    }
    addOrder=(orderModel)=>{
        return this.post(`Home/addOrder`,orderModel)
    }
  

}
export const checkoutService=new CheckOutService();