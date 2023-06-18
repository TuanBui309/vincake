import { GET_USER_BY_ID, USLOGIN } from "../constants/Customer";



const { USER_LOGIN } = require("../../util/constants/settingSystem");

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}




const stateDefault =  {
    userLogin : usLogin,
    listUser:{}


}



export const AuthReducers = (state = stateDefault,action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }
        case GET_USER_BY_ID: {
            state.listUser = action.listUser;
            return {...state}
        }

      

        default : return {...state};
    }
}