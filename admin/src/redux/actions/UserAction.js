
import { USER_SIGNIN_API } from "../constants/User/User";
export const singinAction=(email,password)=>{
    return {
        type:USER_SIGNIN_API,
        userLogin:{
            email:email,
            password:password,
        }
    }
}
