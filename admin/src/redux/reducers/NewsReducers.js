import { GET_ALL_NEWS } from "../constants/News/News";


const stateDefault = {
    listNews:[],
    editNews:[],

}

export const NewsReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_NEWS: {
                state.listNews = action.listNews;
                console.log("1asdasd",action.listNews)
                return {...state};
        }
        case 'EDIT_NEWS':{
            state.editNews=action.editNews

        }

       
        default: return {...state}
    }
}