using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Services;
using ApiBase.Service.Services.CommentCustomerService;
using ApiBase.Service.Services.CustomerService;
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
    public class CommentCustomerController : ControllerBase
    {
        ICommentCustomerService _commentCustomerService;
        public CommentCustomerController(ICommentCustomerService commentCustonerService)
        {
            _commentCustomerService = commentCustonerService;
        }
        [HttpGet("getAll")]

        public async Task<IActionResult> getAll(int productId)
        {

            var result = await _commentCustomerService.getCommentByProduct(productId);
            return result;
        }

        [HttpPost("insertComment")]

        [Authorize]
        public async Task<IActionResult> insertComment([FromBody] CommentCustomerModelInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];

            var result = await _commentCustomerService.insertComment(model, accessToken);
            return result;
        }

        [HttpPut("updateComment")]
        [Authorize]

        public async Task<IActionResult> updateComment(CommentCustomerModelUpdate model)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _commentCustomerService.updateComment(model, accessToken);
            return result;
        }


        [HttpDelete("deleteComment")]
        [Authorize]

        public async Task<IActionResult> deleteComment(int idComment)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _commentCustomerService.deleteComment(idComment, accessToken);
            return result;
        }

    }
}
