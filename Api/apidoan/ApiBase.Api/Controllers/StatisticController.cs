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
using ApiBase.Service.Services.StatisticService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBase.Api.Controllers
{
    [FilterTokenCyber]
    [Route("api/[controller]")]
    public class StatisticController : ControllerBase
    {
        IStatisticService _statisticService;
        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }
        [HttpGet("thongkechitieuTheoThang")]
        public async Task<IActionResult> thongKeChiTieuTheoThang()
        {

            var result = await _statisticService.ThongKeChiTieuTheoThang();
            return result;
        }
        [HttpGet("thongkethunhapTheoThang")]
        public async Task<IActionResult> thongkethunhapTheoThang()
        {

            var result = await _statisticService.ThongKeThuNhapTheoThang();
            return result;
        }
        [HttpGet("thonghoadonbanDangXuLy")]
        public async Task<IActionResult> thonghoadonbanDangXuLy()
        {

            var result = await _statisticService.ThongKeHoaDonCXLs();
            return result;
        }

        [HttpGet("thongkechitieuTheoNam")]
        public async Task<IActionResult> thongkechitieuTheoNam(string year)
        {

            var result = await _statisticService.ThongKeChiTieu(year);
            return result;
        }
        [HttpGet("thongkethunhap")]
        public async Task<IActionResult> thongKeThuNhap(string year)
        {

            var result = await _statisticService.ThongKeThuNhap(year);
            return result;
        }
        [HttpGet("thongkehoadonnhapdangxuly")]
        public async Task<IActionResult> thongKeHoaDonNHapDangXuLy(string year)
        {

            var result = await _statisticService.ThongKeHoaDonNhapDangXuLy(year);
            return result;
        }
        [HttpGet("thongkehoadonBandangxuly")]
        public async Task<IActionResult> thongKeHoaDonBanDangXuLy(string year)
        {

            var result = await _statisticService.ThongKeHoaDonBanDangXuLy(year);
            return result;
        }
        //[HttpGet("thongKeChiTieuTheoLoais")]
        //public async Task<IActionResult> thongKeChiTieuTheoLoais(string tuNgay = "", string denNgay = "")
        //{

        //    var result = await _statisticService.ThongKeChiTieuTheoLoais(tuNgay, denNgay);
        //    return result;
        //}
        [HttpGet("top5CustomerMaxTotal")]
        public async Task<IActionResult> top5CustomerMaxTotal(string tuNgay = null, string denNgay = null)
        {

            var result = await _statisticService.Top5CustomerToTal(tuNgay, denNgay);
            return result;
        }

        [HttpGet("thongKeThuNhapTheoLoais")]
        public async Task<IActionResult> thongKeThuNhapTheoLoais(string tuNgay = null, string denNgay = null)
        {

             var result = await _statisticService.ThongKeThuNhapTheoLoais(tuNgay, denNgay);
             return result;
        }
        [HttpGet("top5ProductBC")]
        public async Task<IActionResult> top5ProductBC(string tuNgay = null, string denNgay = null)
        {

            var result = await _statisticService.Top5ProductBc(tuNgay, denNgay);
            return result;
        }


    }
        
      
}
