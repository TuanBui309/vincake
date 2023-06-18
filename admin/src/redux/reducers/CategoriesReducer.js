import { GET_ALL_CATEGORIES } from "../constants/Categories/Categories";

const stateDefault = {
    categoriesList:[],
    editCategories:[],

}

export const CategoriesReducers = (state = stateDefault,action) => {
    switch(action.type){
        case GET_ALL_CATEGORIES: {
                state.categoriesList = action.categoriesData;
                console.log("1asdasd",action.categoriesData)
                return {...state};
        }
        case 'EDIT_CATEGORIES':{
            state.editCategories=action.CategoriesModel

        }

       
        default: return {...state}
    }
}