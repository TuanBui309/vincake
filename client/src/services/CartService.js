import { baseService } from "./baseService";
export class CartService extends baseService{
    constructor(){
        super();
    }
    addToCart=(Cart)=>{
        return this.post(`Cart/addToCart`,Cart)
    }
    getAllCarts=()=>{
        return this.get(`Cart`)
    }
    changeQuantity1=(cartModel)=>{
        return this.put(`Cart/changeQuantity?id=${cartModel.id}`,cartModel)
    }
    deleteCart=(cartId)=>{
        return this.delete(`Cart/deleteCart?idCart=${cartId}`)
    }

}
export const cartService=new CartService();