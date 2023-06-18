using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Repository.Models;
using ApiBase.Service.Services;
using ApiBase.Repository.Repository;

using ApiBase.Service.Services.ProductManagementService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.ViewModels;
using ApiBase.Service.ViewModels.Users;
using bookingticketAPI.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        IProductManagementService _productManagementService;
        public ProductsController(IProductManagementService productsService)
        {
            _productManagementService = productsService;
        }
        [HttpGet("getproduct")]
       
        public async Task<IActionResult> getProduct(string keyword = null, string filter = null)
        {



            return await _productManagementService.TimKiem(keyword,filter);
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {

            var result = await _productManagementService.getAllProduct();
            return result;
        }

        [HttpPost("insertProduct")]

        [Authorize]


        public async Task<IActionResult> insertProduct([FromForm] IFormCollection frm, ProductInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];
            model.image = Request.Form.Files[0];

            var result = await _productManagementService.insertProduct(model, accessToken);
            return result;
        }

        [HttpPut("updateProduct")]
       

        public async Task<IActionResult> updateProduct([FromForm] IFormCollection frm, ProductUpdate model)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            model.image = Request.Form.Files[0];
            var result = await _productManagementService.updateProduct(model, accessToken);
            return result;
        }
        [HttpGet("getProductById")]
        [Authorize]

        public async Task<IActionResult> getProductById(int idProduct)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _productManagementService.getProductById(idProduct, accessToken);
            return result;
        }

        [HttpDelete("deleteProduct")]
        [Authorize]

        public async Task<IActionResult> deleteProduct(int idProDuct)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _productManagementService.deleteProduct(idProDuct, accessToken);
            return result;
        }

    }
}
