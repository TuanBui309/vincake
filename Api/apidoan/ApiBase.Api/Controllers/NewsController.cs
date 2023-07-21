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
using ApiBase.Service.Services.NewsService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        INewsService _newsService;
        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {

            var result = await _newsService.getAllNews();
            return result;
        }

        [HttpPost("insertNews")]
        [Authorize]


        public async Task<IActionResult> insertNews([FromForm] IFormCollection frm, NewsInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];
            model.image = Request.Form.Files[0];

            var result = await _newsService.insertNews(model, accessToken);
            return result;
        }

        [HttpPut("updateNews")]
        [Authorize]

        public async Task<IActionResult> updateNews([FromForm] IFormCollection frm, NewsUpdate model)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            model.image = Request.Form.Files[0];
            var result = await _newsService.updateNews(model, accessToken);
            return result;
        }
        [HttpGet("getNewsById")]
      

        public async Task<IActionResult> getNewsById(int idNews)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _newsService.getNewsById(idNews, accessToken);
            return result;
        }

        [HttpDelete("deleteNews")]
        [Authorize]

        public async Task<IActionResult> deleteNews(int idNews)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _newsService.deleteNews(idNews, accessToken);
            return result;
        }

    }
}
