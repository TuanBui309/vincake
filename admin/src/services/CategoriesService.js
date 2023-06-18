import { baseService } from "./baseService";


export class CategoriesService extends baseService {

    constructor(){
        super();
    }
    

    getCategories = () => {
        
       return this.get(`Categories`);
    }


    insertCategory = (Categories) => {
        return this.post(`Categories/insertCategory`,Categories);
    }


    deleteCategory = (id) => {
        return this.delete(`/Categories/deleteCategories?idCategories=${id}`);
    } 


    getUserByProjectId = (idCategories) =>{ 
        return this.get(`/Categories/getCategoryById?idComment=${idCategories}`)
    }
    updateCategory = (Categories) => {
        return this.put(`Categories/updateCategories?`,Categories);
    } 
}


export const categoryService1 = new CategoriesService();
