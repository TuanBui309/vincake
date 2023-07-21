using ApiBase.Repository.Models;

using System;
using System.Collections.Generic;
using System.Text;
using ApiBase.Service.Infrastructure;
using ApiBase.Repository.Repository;
using AutoMapper;
using ApiBase.Service.Services.CustomerService;
using ApiBase.Service.Constants;
using ApiBase.Service.ViewModels;
using System.Threading.Tasks;
using System.Reflection;
using ApiBase.Service.Utilities;
using Microsoft.AspNetCore.Mvc;
using ApiBase.Service.ViewModels.ProjectViewModel;
using Newtonsoft.Json.Linq;

namespace ApiBase.Service.Services.CartService
{

    public interface ICartService : IService<Cart, Cart>
    {
        Task<ResponseEntity> getCartById(string token);
        Task<ResponseEntity> addToCart( CartModelInsert model, string token);
        Task<ResponseEntity> deleteCart(int idCart, string token);
        Task<ResponseEntity> changeQuantity(CartModelInsert model,int id, string token);



    }
    public class CartService : ServiceBase<Cart, Cart>, ICartService
    {
        IProductRepository _productRepository;
        ICartRepository _cartReposity;
        ICustomerService _customerService;
        ICustomerRepository _customerRepository;
        public CartService(IProductRepository proRe, ICustomerRepository cusPRO, ICartRepository cartPR, ICustomerService customerSV,
            IMapper mapper)
            : base(cartPR, mapper)
        {
            _productRepository = proRe;
            _customerService = customerSV;
            _cartReposity=cartPR;

            _customerRepository = cusPRO;


        }
        public async Task<ResponseEntity> getCartById(string token)
        {
            try
            {
                var userJira = _customerService.getCustomerByToken(token);
                Customer user = _customerService.getCustomerByToken(token).Result;
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("customerId", user.id));
              


                
                
                IEnumerable<Cart> carts = _cartReposity.GetMultiByListConditionAndAsync(columns).Result;
                var listResult = new List<CartViewModel>();



                if (carts == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, carts , MessageConstants.MESSAGE_ERROR_404);

                }
                foreach (var item in carts)
                {
                    Product products = _productRepository.GetSingleByConditionAsync("id", item.productId).Result;
                    Repository.Models.ProductCart mem = new Repository.Models.ProductCart();
                    mem.id = item.productId;
                    mem.tenSP = products.tenSP;
                    mem.maLoai = products.maLoai;
                    mem.giaBan = products.giaBan;
                    mem.sale = products.sale;
                    mem.soLuong = products.soLuong;
                    mem.tinhTrang = products.tinhTrang;
                    mem.image = products.image;
                    CartViewModel cartModel = new CartViewModel();
                    cartModel.id = item.id;
                    cartModel.productId = item.productId;
                    cartModel.quantity = item.quantity;
                    cartModel.customerId = item.customerId;
                    cartModel.productcarts=mem;
                    cartModel.subTotal = cartModel.productcarts.giaBan * cartModel.quantity;
                  
                    



                    listResult.Add(cartModel);
                   



                }
            






                return new ResponseEntity(StatusCodeConstants.OK, listResult, MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "không tìm thấy giỏ hàng có id này", MessageConstants.INSERT_ERROR);
            }
        }
        //public Customer getUserAsync(int id)
        //{
        //    var userJira = _customerRepository.GetSingleByConditionAsync("id", id).Result;
        //    return userJira;
        //}

        public async Task<ResponseEntity> deleteCart(int idCart, string token)
        {
            try
            {
                var userJira = await _customerService.getCustomerByToken(token);
                Cart carts = await _cartReposity.GetSingleByIdAsync(idCart);

                if (carts == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy giỏ hàng có cartId này", MessageConstants.MESSAGE_ERROR_404);

                }
                await _cartReposity.DeleteByIdAsync(new List<dynamic>() { idCart });


                return new ResponseEntity(StatusCodeConstants.OK, "Xóa giỏ hàng thành công", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Không tìm thấy giỏ hàng có cartId này", MessageConstants.MESSAGE_ERROR_404);
            }
        }
       



        public async Task<ResponseEntity> addToCart(CartModelInsert model, string token)
        {
            try
            {
                var userJira = _customerService.getCustomerByToken(token);
                Customer user = _customerService.getCustomerByToken(token).Result;
               
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("customerId", user.id));
                columns.Add(new KeyValuePair<string, dynamic>("productId ", model.productId));

                var lstproduct = _cartReposity.GetSingleByListConditionAsync(columns).Result;
                var product = _productRepository.GetSingleByConditionAsync("id", model.productId).Result;
             
                if (lstproduct !=null)
                {
                    if (product.soLuong<model.quantity)

                    {
                        return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Số lượng sản phẩm còn lại trong kho không đủ", MessageConstants.INSERT_ERROR);

                    }

                    
                        lstproduct.quantity+=model.quantity;
                    product.soLuong -= model.quantity;
                    await _productRepository.UpdateAsync("id", product.id,product);

                    await _cartReposity.UpdateAsync("id", lstproduct.id, lstproduct);

                    return new ResponseEntity(StatusCodeConstants.OK,model, MessageConstants.INSERT_SUCCESS);



                }
                else
                {
                    if (product.soLuong < model.quantity)
                    {
                        return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Số lượng sản phẩm còn lại trong kho không đủ", MessageConstants.INSERT_ERROR);

                    }


                    Cart carts = new Cart();
                    carts.productId = model.productId;
                    carts.customerId = user.id;
                    carts.quantity = model.quantity;
                    carts.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                    product.soLuong -= model.quantity;
                    await _productRepository.UpdateAsync("id", product.id, product);

                    if (carts == null)
                        return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, carts, MessageConstants.INSERT_ERROR);


                    carts = await _cartReposity.InsertAsync(carts);

                    return new ResponseEntity(StatusCodeConstants.OK, model, MessageConstants.INSERT_SUCCESS);
                }
              








            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "Unauthorize", MessageConstants.MESSAGE_ERROR_401);

            }
        }
        public async Task<ResponseEntity> changeQuantity(CartModelInsert model,int id, string token)
        {
            try
            {
                var userJira = _customerService.getCustomerByToken(token);
                Customer user = _customerService.getCustomerByToken(token).Result;

               

                var lstproduct = _cartReposity.GetSingleByConditionAsync("id",id).Result;
                var product = _productRepository.GetSingleByConditionAsync("id", lstproduct.productId).Result;

                if (lstproduct != null)
                {
                    if (product.soLuong < model.quantity - lstproduct.quantity)

                    {
                        return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Số lượng sản phẩm còn lại trong kho không đủ", MessageConstants.INSERT_ERROR);

                    }

                    product.soLuong -= (model.quantity - lstproduct.quantity);
                    await _productRepository.UpdateAsync("id", product.id, product);
                    lstproduct.quantity = model.quantity;
                   
                   

                    await _cartReposity.UpdateAsync("id", lstproduct.id, lstproduct);

                    return new ResponseEntity(StatusCodeConstants.OK, model, MessageConstants.INSERT_SUCCESS);



                }
                else
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "k tìm thấy sản phẩm có id này trong giỏ hàng", MessageConstants.MESSAGE_ERROR_404);
                }
             









            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "Unauthorize", MessageConstants.MESSAGE_ERROR_401);

            }
        }




    }

}
