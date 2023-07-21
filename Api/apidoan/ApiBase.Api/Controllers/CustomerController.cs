using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Constants;
using ApiBase.Service.Services.CustomerService;
using ApiBase.Service.ViewModels;
using ApiBase.Service.Services;
using bookingticketAPI.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        ICustomerRepository _CustomerRepository;
        ICustomerService _customerService;
        IMailService _mailService;
        [FilterTokenCyber]

        public CustomerController(ICustomerRepository customerRepository, IMailService mailSR, ICustomerService CustomerService)
        {
            _CustomerRepository = customerRepository;
            _customerService = CustomerService;
            _mailService = mailSR;
        }

        [HttpPost("email")]

        public async Task<IActionResult> SendEmails( string toName, string toEmail,string content)
        {
             await _mailService.SendMailAsync(toName,toEmail,content);
            return Ok();
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] CustomerModel model)
        {
            return await _customerService.RegisterCustomer(model);
        }
        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPasswords([FromBody] CustomerModelForgerPassword model)
        {
            return await _customerService.ForgetPassword(model);
        }
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPasswords([FromBody] ResetPasswordModel model)
        {
            return await _customerService.ResetPassword(model);
        }


        [HttpPut("editCustomer")]
        public async Task<IActionResult> editCustomer([FromBody] CustomerModelUpdate model)
        {
            return await _customerService.editCustomer(model);
        }

        [Authorize]

        [HttpDelete("deleteCustomer")]
        public async Task<IActionResult> delete(int id)
        {
            return await _customerService.deleteCustomer(id);
        }

        [HttpGet("getCustomer")]
     
        public async Task<IActionResult> getCustomer(string keyword = "")
        {



            return await _customerService.getCustomer(keyword);
        }

        [HttpGet("getCustomerById")]

        public async Task<IActionResult> getCustomerByToken(int idCustomer)
        {



            return await _customerService.getCustomerById(idCustomer);
        }




        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] CustomerLogin model)
        {
            return await _customerService.SignIn(model);
        }

        //[HttpPost("signup")]
        //public async Task<IActionResult> SignUp([FromBody] InfoCustomer model)
        //{
        //    return await _CustomerService.SignUpAsync(model);
        //}


        //[HttpPost("signin")]
        //public async Task<IActionResult> Signin([FromBody] CustomerLogin model)
        //{
        //    return await _CustomerService.Login(model);
        //}


        [HttpPost("facebooklogin")]
        public async Task<IActionResult> FacebookLogin([FromBody] DangNhapFacebookViewModel model)
        {
            return await _customerService.SignInFacebookAsync(model);
        }



        [HttpPost("TestToken")]
        [Authorize]
        public async Task<IActionResult> TestToken()
        {

            return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Okay ! đã check token được phép truy cập !", MessageConstants.SIGNIN_SUCCESS);
        }

        //[HttpPost("searchCustomerProject")]
        //public async Task<IActionResult> searchCustomerProject (int idProject=0)
        //{


        //    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Okay ! đã check token được phép truy cập !", MessageConstants.SIGNIN_SUCCESS);
        //}
    }
}
