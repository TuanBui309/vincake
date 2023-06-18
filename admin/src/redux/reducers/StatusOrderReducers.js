

const stateDefault = {
    listStatus:[],
 

}

export const StatusOrderReducers = (state = stateDefault,action) => {
    switch(action.type){
        case 'GET_ALL_STATUS_ORDER': {
                state.listStatus = action.listStatus;
                console.log("1asdasd",action.listSupplier)
                return {...state};
        }
       

       
        default: return {...state}
    }
}