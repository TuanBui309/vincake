import { baseService } from "./baseService";


export class StatusOrderService extends baseService {

    constructor(){
        super();
    }
    

    getAllStatus = () => {
        
       return this.get(`StatusOrder/getAll`);
    }


 
}


export const statusOrderServices = new StatusOrderService();
