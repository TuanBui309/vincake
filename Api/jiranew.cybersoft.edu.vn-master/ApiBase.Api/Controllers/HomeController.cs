using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Repository.Models;
using ApiBase.Service.Services;
using ApiBase.Repository.Repository;

using ApiBase.Service.Services.OrderService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.ViewModels;
using ApiBase.Service.ViewModels.Users;
using bookingticketAPI.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using ApiBase.Service.Constants;
using ApiBase.Service.Services.CategoriesService;
using ApiBase.Service.Services.ProductManagementService;
using ApiBase.Service.Services.OrAdminService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        IOrdersService _ordersService;
        ICategoriesService _categoryService;
        IProductManagementService _productManagementService;
        IOrAdminService _historyService;
        public HomeController(IOrdersService ordersService, ICategoriesService categoryService, IProductManagementService productManagementService, IOrAdminService hSV)
        {
            _ordersService = ordersService;
            _categoryService = categoryService;
            _productManagementService = productManagementService;
            _historyService = hSV;

        }

        [HttpGet("getAllCategories")]
        public async Task<IActionResult> getAllCategories()
        {

            var result = await _categoryService.GetAllAsync();
            return result;
        }
        [HttpGet("getAllProducts")]
        public async Task<IActionResult> getAllProduct()
        {

            var result = await _productManagementService.getAllProduct();
            return result;
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {

            var result = await _ordersService.GetAllAsync();
            return result;
        }
        [HttpGet("getProductById")]
       

        public async Task<IActionResult> getProductById(int idProduct)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _productManagementService.getProductById(idProduct, accessToken);
            return result;
        }
        [HttpGet("getProductByIdCategories")]
       

        public async Task<IActionResult> getProductByIdCategories(int idCategories)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _productManagementService.getProductByIdCategories(idCategories, accessToken);
            return result;
        }

        [Authorize]
        [HttpPost("addOrder")]
      


        public async Task<IActionResult> addOder([FromBody] OrdersModelInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];

           return await _ordersService.AddOrder(model, accessToken);
            
        }
        [Authorize]
        [HttpDelete("deleteOrder")]
        public async Task<IActionResult> deleteOrder(int idOrder)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _ordersService.deleteOrder(idOrder, accessToken);
            return result;
        }
        [Authorize]
        [HttpPut("HuyDonHang")]
        public async Task<IActionResult> huyDonHang(int idOrder, int idStatus)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];

       

            return await _ordersService.HuyDonHang(idStatus, idOrder, accessToken);

        }
        [Authorize]
        [HttpPut("DatLai")]
        public async Task<IActionResult> datLai(int idOrder, int idStatus)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];



            return await _ordersService.DatLai(idStatus, idOrder, accessToken);
        }
        [HttpGet("History")]
        [Authorize]

        public async Task<IActionResult> HistoryOrder()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _historyService.HistoryOrder(  accessToken);
            return result;
        }





    }
}
