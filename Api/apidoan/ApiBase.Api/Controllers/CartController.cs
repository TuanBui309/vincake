using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Repository.Models;
using ApiBase.Service.Services;
using ApiBase.Repository.Repository;

using ApiBase.Service.Services.CartService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.ViewModels;
using ApiBase.Service.ViewModels.Users;
using bookingticketAPI.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        ICartService _cartService;
        public CartController(ICartService cartsService)
        {
            _cartService = cartsService;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> getAll()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _cartService.getCartById(accessToken);
            return result;
        }

        [HttpPost("addToCart")]
        [Authorize]


        public async Task<IActionResult> addToCart([FromBody] CartModelInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];

            var result = await _cartService.addToCart(model, accessToken);
            return result;
        }
        [HttpPut("changeQuantity")]
        [Authorize]


        public async Task<IActionResult> changeQuantity([FromBody]  CartModelInsert model, int id)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];

            var result = await _cartService.changeQuantity(model,id, accessToken);
            return result;
        }




        [HttpDelete("deleteCart")]
        [Authorize]

        public async Task<IActionResult> deleteProduct(int idCart)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _cartService.deleteCart(idCart, accessToken);
            return result;
        }

    }
}
