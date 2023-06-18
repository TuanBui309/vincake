import { baseService } from "./baseService";
import { Axios } from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem"

export class UserService extends baseService {

    constructor(){
        super();
    }
   

    getUser = (keyWord) => {
        
       return this.get(`Users/getUser?keyword=${keyWord}`);
    }
    insertUser = (userModel) => {
        return this.post(`Users/signup`,userModel);
    }


    deleteUser= (id) => {
        return this.delete(`Users/deleteUser?id=${id}`);
    } 


   
    updateUser = (userModel) => {
        return this.put(`Users/editUser`,userModel);
    } 


    


}


export const userService = new UserService();
