import { CUSTOMER_SIGNIN_API } from "../constants/Customer"


export const AuthAction=(email,password)=>{
    return {
        type:CUSTOMER_SIGNIN_API,
        userLogin:{
            email:email,
            password:password,
        }
    }
}




















// import { USER_SIGNIN_API } from "../constants/Cyberbugs/Cyberbugs"



// export const singinCyberbugAction = (email, passWord) => {
//     return {
//         type: USER_SIGNIN_API,
//         userLogin: {
//             email: email,
//             passWord: passWord
//         }
//     }
// }