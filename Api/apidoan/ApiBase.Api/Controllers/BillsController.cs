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
using ApiBase.Service.Services.OrderService;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class BillController : ControllerBase
    {
        IBillService _billService;
        public BillController(IBillService billService)
        {
            _billService = billService;
        }
        [HttpGet("thongke")]
        public async Task<IActionResult> thongKe()
        {

            var result = await _billService.ThongKe();
            return result;
        }
        [HttpGet("thongkethuchi")]
        public async Task<IActionResult> thongKeThuChi()
        {

            var result = await _billService.ThongKeThuChi1();
            return result;
        }
        [HttpGet("getAllProductBil")]
        [Authorize]
        public async Task<IActionResult> getAll()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];

            var result = await _billService.getAllProductBill(accessToken);
            return result;
        }
        [HttpGet("getBillDetailById")]
        public async Task<IActionResult> getDetailById(int idBills)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];

            var result = await _billService.getDetailBillByid(idBills,accessToken);
            return result;
        }
        [HttpGet]
        public async Task<IActionResult> getAllBill()
        {

            var result = await _billService.getAllBill();
            return result;
        }

        [HttpPost("addProductBill")]
        [Authorize]


        public async Task<IActionResult> addProductBill([FromBody] ProductBillInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];

            var result = await _billService.AddProductBill(model, accessToken);
            return result;
        }
        [HttpPost("addNewProductBill")]
        [Authorize]


        public async Task<IActionResult> addNewProductBill([FromForm] IFormCollection frm, NewProductBillInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];
            model.image = Request.Form.Files[0];

            var result = await _billService.AddNewProductBill(model, accessToken);
            return result;
        }
        [Authorize]
        [HttpPost("addBill")]



        public async Task<IActionResult> addBill([FromBody] BillModelInsert model)
        {

            var accessToken = Request.Headers[HeaderNames.Authorization];

            return await _billService.AddBill(model, accessToken);

        }

        [HttpPut("updateBills")]
        [Authorize]

        public async Task<IActionResult> updateBills([FromBody] BillModelUpdate model)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
          
            var result = await _billService.updateBill(model, accessToken);
            return result;
        }

        [HttpDelete("deleteAllProductBill")]
        [Authorize]

        public async Task<IActionResult> deleteAllPrductBills()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _billService.deleteAllProductBill( accessToken);
            return result;
        }

        [HttpDelete("deleteProductBill")]
        [Authorize]

        public async Task<IActionResult> deletePrductBills(int idProduct)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _billService.deleteProductBill(idProduct,accessToken);
            return result;
        }



        [HttpDelete("deleteBill")]
        [Authorize]

        public async Task<IActionResult> deleteBill(int idBill)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _billService.deleteBill(idBill, accessToken);
            return result;
        }
        [HttpDelete("deleteDetail")]
        [Authorize]

        public async Task<IActionResult> deleteDetail(int idDetail)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var result = await _billService.deleteBillDetail(idDetail, accessToken);
            return result;
        }

    }
}
