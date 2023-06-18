import { baseService } from "./baseService";


export class NewsService extends baseService {

    constructor(){
        super();
    }
    

    getNews = () => {
        
       return this.get(`News`);
    }


    insertNews = (newsModel) => {
        return this.post(`News/insertNews`,newsModel);
    }


    deleteNews= (id) => {
        return this.delete(`News/deleteNews?idNews=${id}`);
    } 


   
    updateNews = (newsModel) => {
        return this.put(`News/updateNews`,newsModel);
    } 
}


export const newsServices = new NewsService();
