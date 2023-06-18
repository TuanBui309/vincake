import { baseService } from "./baseService";
export class CommentService extends baseService{
    constructor(){
        super();
    }
  
  
    
    getAllCmtById = (productId) => {
        return this.get(`CommentCustomer/getAll?productId=${productId}`);
    }
    
    insertComMent=(cmtInserModel)=>{
        return this.post(`CommentCustomer/insertComment`,cmtInserModel)
    }
    updateComment=(cmtUpdateMOdel)=>{
       
        return this.put(`CommentCustomer/updateComment?id=${cmtUpdateMOdel.id}&contentComment=${cmtUpdateMOdel.contentComment}`,cmtUpdateMOdel);
    }
    deleteComment=(idComment)=>{
       
        return this.delete(`CommentCustomer/deleteComment?idComment=${idComment}`);
    }
}
export const cmtService=new CommentService();