using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Repository.Models;
using ApiBase.Service.Services;
using ApiBase.Repository.Repository;

using ApiBase.Service.Services.CategoriesService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.ViewModels;
using ApiBase.Service.ViewModels.Users;
using bookingticketAPI.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using ApiBase.Service.Services;
using ApiBase.Service.Services.SupplierService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        ISupplierService _supplierService;
        public SupplierController(ISupplierService supplierServices)
        {
            _supplierService = supplierServices;
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {

            var result = await _supplierService.GetAllAsync();
            return result;
        }

        [HttpPost("insertSupplier")]
        [Authorize]


        public async Task<IActionResult> insertSupplier([FromBody] SupplierInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];
            

            var result = await _supplierService.insertSupplier(model, accessToken);
            return result;
        }

        [HttpPut("updateSupplier")]
        [Authorize]

        public async Task<IActionResult> updateCategories([FromBody] SupplierUpdate model)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
           
            var result = await _supplierService.updateSupplier(model, accessToken);
            return result;
        }
       
        [HttpDelete("deleteSupplier")]
        [Authorize]

        public async Task<IActionResult> deleteSupplier(int idSupplier)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _supplierService.deleteSupplier(idSupplier, accessToken);
            return result;
        }

    }
}
