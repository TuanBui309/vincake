import Axios from "axios";
import { DOMAIN, TOKEN } from "../util/constants/settingSystem";



export class AuthService{
    signin=(userLogin)=>{
        return Axios({
            url:`${DOMAIN}/Customer/signin`,
            method:'POST',
            data:userLogin
        })
    }
    signup=(customerModel)=>{
        return Axios({
            url:`${DOMAIN}/Customer/signup`,
            method:'POST',
            data:customerModel
        })
    }
    resetPassword=(customerModel)=>{
        return Axios({
            url:`${DOMAIN}/Customer/ResetPassword`,
            method:'POST',
            data:customerModel
        })
    }
    ForgetPassword=(userLogin)=>{
        return Axios({
            url:`${DOMAIN}/Customer/ForgetPassword`,
            method:'POST',
            data:userLogin
        })
    }
    GetUserByid=(idUser)=>{
        return Axios({
            url:`${DOMAIN}/Customer/getCustomerById?idCustomer=${idUser}`,
            method:'GET',
           
        })
    }
    EditCustomer=(customerModel)=>{
        return Axios({
            url:`${DOMAIN}/Customer/editCustomer`,customerModel,
            method:'PUT',
            data:customerModel
        })
    }
    getCity=()=>{
        return Axios({
            url:`https://provinces.open-api.vn/api/p/`,
            method:'GET',
            
        })
        
    }
    getDistrict=()=>{
        return Axios({
            url:`https://provinces.open-api.vn/api/d/`,
            method:'GET',
            
        })
        
    }
    getWards=()=>{
        return Axios({
            url:`https://provinces.open-api.vn/api/w/`,
            method:'GET',
            
        })
        
    }
   
   
   
   
   

   
    

}
export const authService=new AuthService();



























