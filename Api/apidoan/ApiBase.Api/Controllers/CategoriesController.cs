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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        ICategoriesService _categoryService;
        public CategoriesController(ICategoriesService CategoriesService1)
        {
            _categoryService = CategoriesService1;
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {

            var result = await _categoryService.GetAllAsync();
            return result;
        }

        [HttpPost("insertCategory")]
        [Authorize]


        public async Task<IActionResult> insertCategories([FromForm] IFormCollection frm, CategoriesInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];
            model.image = Request.Form.Files[0];

            var result = await _categoryService.insertCategories(model, accessToken);
            return result;
        }

        [HttpPut("updateCategories")]
        [Authorize]

        public async Task<IActionResult> updateCategories([FromForm] IFormCollection frm, CategoriesUpdate model)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            model.image = Request.Form.Files[0];
            var result = await _categoryService.updateCategories(model, accessToken);
            return result;
        }
        [HttpGet("getCategoryById")]
        [Authorize]

        public async Task<IActionResult> getCategoryById(int idCategories)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _categoryService.getCategoriesById(idCategories, accessToken);
            return result;
        }

        [HttpDelete("deleteCategories")]
        [Authorize]

        public async Task<IActionResult> deleteCategory(int idCategories)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _categoryService.deleteCategories(idCategories, accessToken);
            return result;
        }

    }
}
