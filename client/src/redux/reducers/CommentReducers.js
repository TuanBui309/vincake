import { GET_ALL_COMMENT } from "../constants/Comment";


const stateDefault = {
    listComment:[],
    editComment:[],

}

export const CommentReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_COMMENT: {
                state.listComment = action.listComment;
                console.log("1asdasd",action.categoriesData)
                return {...state};
        }
        case 'EDIT_COMMENT':{
            state.editComment=action.commentModel

        }

       
        default: return {...state}
    }
}