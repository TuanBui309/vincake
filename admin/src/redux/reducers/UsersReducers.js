import { GET_ALL_USER, USLOGIN } from "../constants/User/User";


const { USER_LOGIN } = require("../../util/constants/settingSystem");






let usLogin={};
if(localStorage.getItem(USER_LOGIN))
{
    usLogin=JSON.parse(localStorage.getItem(USER_LOGIN));

}
const stateDefault={
    userLogin:usLogin,
    listUser:[],
    editUser:[],
}
export const UsersReducers=(state=stateDefault,action)=>{
    switch(action.type){
        case USLOGIN:{
            state.userLogin=action.userLogin;
            return {...state}

        }
        case GET_ALL_USER: {
            state.listUser = action.listUser;
            console.log("qewqwe",action.listUser)
            return {...state};
    }
    case 'EDIT_USER':{
        state.editUser=action.editUser

    }
        default:return{...state};

    }
}