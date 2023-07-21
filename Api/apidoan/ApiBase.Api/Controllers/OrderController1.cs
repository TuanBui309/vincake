using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Repository.Models;
using ApiBase.Service.Services;
using ApiBase.Repository.Repository;
using ApiBase.Service.Services.BillService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.ViewModels;
using ApiBase.Service.ViewModels.Users;
using bookingticketAPI.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

using Microsoft.AspNetCore.Http;
using ApiBase.Service.Services.OrAdminService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class OrderController1 : ControllerBase
    {
        IOrAdminService _orderService;
        public OrderController1(IOrAdminService orderService)
        {
            _orderService = orderService;
        }
     
       
        
        [HttpGet]
        public async Task<IActionResult> getAllOrders()
        {

            var result = await _orderService.getAllOrder();
            return result;
        }

       
       

        [HttpPut("updateOrders")]
        [Authorize]

        public async Task<IActionResult> updateBills([FromBody] OrderModelUpdate model)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];

            var result = await _orderService.updateOrder(model, accessToken);
            return result;
        }

      


        [HttpDelete("deleteOrder")]
        [Authorize]

        public async Task<IActionResult> deleteOrder(int idOrder)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _orderService.deleteOrder(idOrder, accessToken);
            return result;
        }
       

    }
}
