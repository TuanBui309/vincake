using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Constants;
using ApiBase.Service.Infrastructure;
using ApiBase.Service.Services.CustomerService;
using ApiBase.Service.Services.ProductManagementService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.Utilities;
using ApiBase.Service.ViewModels;

using ApiBase.Service.ViewModels.ProjectViewModel;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http.Internal;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;

using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Service.Services.StatisticService
{

    public interface IStatisticService : IService<ThongKeThuChi, ThongKeThuChi>
    {
      
        Task<ResponseEntity> ThongKeChiTieu(string year = null);
        Task<ResponseEntity> ThongKeHoaDonNhapDangXuLy(string year = null);
       
        Task<ResponseEntity> ThongKeThuNhap(string year=null);
        Task<ResponseEntity> ThongKeHoaDonBanDangXuLy(string year = null);
        //Task<ResponseEntity> ThongKeChiTieuTheoLoais(string tuNgay = "", string denNgay = "");
        Task<ResponseEntity> ThongKeThuNhapTheoLoais(string tuNgay = null, string denNgay = null);
        Task<ResponseEntity> Top5CustomerToTal(string tuNgay = null, string denNgay = null);
        Task<ResponseEntity> Top5ProductBc(string tuNgay = null, string denNgay = null);
        Task<ResponseEntity> ThongKeThuNhapTheoThang();
        Task<ResponseEntity> ThongKeChiTieuTheoThang();
        Task<ResponseEntity> ThongKeHoaDonCXLs();





    }
    public class StatisticService : ServiceBase<ThongKeThuChi, ThongKeThuChi>, IStatisticService
    {
       

      
        IThongKeTCRepository _thongKeTCRepository;
        ITCTheoLoaiRepository _TCTheoLoaiRepository;
        ITop5CustomerRepository _top5CustomerRepository;
        ITop5ProductBCRepository _top5ProductBCRepository;

        IUserJiraRepository _user;
        IUserService _userService;


        public StatisticService( IThongKeTCRepository tcRe ,IUserService userService,  IUserJiraRepository userRe, ITCTheoLoaiRepository tcLoaiRE, ITop5CustomerRepository topCusRe, ITop5ProductBCRepository topPoRe,
            IMapper mapper)
            : base(tcRe, mapper)
        {
            _thongKeTCRepository = tcRe;
           
            _userService = userService;
            _TCTheoLoaiRepository = tcLoaiRE;
            _TCTheoLoaiRepository = tcLoaiRE;
            _top5CustomerRepository = topCusRe;
            _top5ProductBCRepository = topPoRe;
            _user = userRe;





        }
        public async Task<ResponseEntity> ThongKeChiTieuTheoThang()
        {
            List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
           
            DateTime dt = DateTime.Now;
          
            var result = await _thongKeTCRepository.ThongKeChiTieuTheoThang(dt.Month,dt.Year,14);
            return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

        }
        public async Task<ResponseEntity> ThongKeThuNhapTheoThang()
        {
            List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
            DateTime dt = DateTime.Now;

            var result = await _thongKeTCRepository.ThongKeThuNhapTheoThang(dt.Month, dt.Year, 14);
            return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

        }
        public async Task<ResponseEntity> ThongKeHoaDonCXLs()
        {
            List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
            DateTime dt = DateTime.Now;

            var result = await _thongKeTCRepository.ThongKeHoaDonCXL(dt.Month,14);
            return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

        }

        public async Task<ResponseEntity> ThongKeChiTieu(string year)
        {
            if (year == null)
            {
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                DateTime dt = DateTime.Now;
                columns.Add(new KeyValuePair<string, dynamic>("statusId ", 14));
                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated) ", dt.Year));
                var result = await _thongKeTCRepository.ThongKeThuChi(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }
            else
            {
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                DateTime dt = DateTime.Now;
                columns.Add(new KeyValuePair<string, dynamic>("statusId ", 14));
                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated) ", year));
                var result = await _thongKeTCRepository.ThongKeThuChi(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }

        }
        public async Task<ResponseEntity> ThongKeHoaDonNhapDangXuLy(string year)
        {
            if (year == null)
            {
                DateTime dt = DateTime.Now;
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated) ", dt.Year));
                columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
                var result = await _thongKeTCRepository.ThongKeThuChi(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }
            else
            {
                
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated) ", year));
                columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
                var result = await _thongKeTCRepository.ThongKeThuChi(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }

        }
        public async Task<ResponseEntity> ThongKeThuNhap(string year)
        {
            if (year == null)
            {
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

                DateTime dt = DateTime.Now;
                columns.Add(new KeyValuePair<string, dynamic>("statusId ", 14));
               

                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated) ", dt.Year));
                var result = await _thongKeTCRepository.ThongKeThuNhap(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }
            else
            {
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

                columns.Add(new KeyValuePair<string, dynamic>("statusId ", 14));
                DateTime dt = DateTime.Now;

                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated) ", year));
                var result = await _thongKeTCRepository.ThongKeThuNhap(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }

        }
        public async Task<ResponseEntity> ThongKeHoaDonBanDangXuLy(string year)
        {
            if (year == null)
            {
                DateTime dt = DateTime.Now;
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

                columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated)", dt.Year));
                var result = await _thongKeTCRepository.ThongKeThuNhap(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }
            else
            {

                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

                columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
                columns.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated)", year));
                var result = await _thongKeTCRepository.ThongKeThuNhap(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }
           
        }
        //public async Task<ResponseEntity> ThongKeChiTieuTheoLoais(string tuNgay = "", string denNgay = "")
        //{
        //    DateTime dtTuNgay = FuncUtilities.GetDateCurrent();
        //    DateTime dtDenNgay = FuncUtilities.GetDateCurrent();
        //    if(denNgay=="" && tuNgay== "")
        //    {
        //        List<KeyValuePair<string, dynamic>> columns1 = new List<KeyValuePair<string, dynamic>>();
        //        DateTime dt = DateTime.Now;

        //        columns1.Add(new KeyValuePair<string, dynamic>("MONTH(dateCreated)", dt.Month));
        //        //columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
        //        var result1 = await _TCTheoLoaiRepository.ThongKeChiTieuTheoLoai(columns1);
        //        return new ResponseEntity(StatusCodeConstants.OK, result1, MessageConstants.MESSAGE_SUCCESS_200);

        //    }
        //    else
        //    {
        //        if (tuNgay != "")
        //        {
        //            try
        //            {
        //                dtTuNgay = FuncUtilities.ConvertStringToDate(tuNgay);
        //            }
        //            catch (Exception ex)
        //            {

        //                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ", MessageConstants.MESSAGE_ERROR_400);


        //            }
        //        }
        //        if (denNgay != "")
        //        {
        //            try
        //            {
        //                dtDenNgay = FuncUtilities.ConvertStringToDate(denNgay);
        //            }
        //            catch (Exception ex)
        //            {
        //                //return new ResponseEntity(StatusCodeConstants.OK, "Ngày không hợp lệ", MessageConstant.MESSAGE_SUCCESS_200);

        //                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ, Ngày có định dạng dd/MM/yyyy !", MessageConstants.MESSAGE_ERROR_400);
        //            }

        //        }
        //        List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

        //        columns.Add(new KeyValuePair<string, dynamic>("dateCreated >", dtTuNgay.Date));
        //        columns.Add(new KeyValuePair<string, dynamic>("dateCreated <", dtDenNgay.Date));
        //        //columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
        //        var result = await _TCTheoLoaiRepository.ThongKeChiTieuTheoLoai(columns);
        //        return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

        //    }
         
          
            
          


        //}
        public async Task<ResponseEntity> ThongKeThuNhapTheoLoais(string tuNgay=null , string denNgay=null)
        {
            DateTime dtTuNgay = FuncUtilities.GetDateCurrent();
            DateTime dtDenNgay = FuncUtilities.GetDateCurrent();
            if(tuNgay==null && denNgay==null)
            {
                List<KeyValuePair<string, dynamic>> columns1 = new List<KeyValuePair<string, dynamic>>();
                DateTime dt = DateTime.Now;

                columns1.Add(new KeyValuePair<string, dynamic>("MONTH(o.dateCreated)", dt.Month));
                columns1.Add(new KeyValuePair<string, dynamic>("YEAR(o.dateCreated)", dt.Year));
                columns1.Add(new KeyValuePair<string, dynamic>("o.statusId ", 14));
                var result1 = await _TCTheoLoaiRepository.ThongKeThuNhapTheoLoai(columns1);
                return new ResponseEntity(StatusCodeConstants.OK, result1, MessageConstants.MESSAGE_SUCCESS_200);
            }
            else
            {
                if (tuNgay != null)
                {
                    try
                    {
                        dtTuNgay = FuncUtilities.ConvertStringToDate(tuNgay);
                    }
                    catch (Exception ex)
                    {

                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ", MessageConstants.MESSAGE_ERROR_400);


                    }
                }
                if (denNgay != null)
                {
                    try
                    {
                        dtDenNgay = FuncUtilities.ConvertStringToDate(denNgay);
                    }
                    catch (Exception ex)
                    {
                        //return new ResponseEntity(StatusCodeConstants.OK, "Ngày không hợp lệ", MessageConstant.MESSAGE_SUCCESS_200);

                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ, Ngày có định dạng dd/MM/yyyy !", MessageConstants.MESSAGE_ERROR_400);
                    }

                }
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

                columns.Add(new KeyValuePair<string, dynamic>("o.dateCreated >", dtTuNgay.Date));
                columns.Add(new KeyValuePair<string, dynamic>("o.dateCreated <", dtDenNgay.Date));
                columns.Add(new KeyValuePair<string, dynamic>("o.statusId ", 14));
                var result = await _TCTheoLoaiRepository.ThongKeThuNhapTheoLoai(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }
          
          


        }
        public async Task<ResponseEntity> Top5CustomerToTal(string tuNgay = null, string denNgay = null)
        {
            DateTime dtTuNgay = FuncUtilities.GetDateCurrent();
            DateTime dtDenNgay = FuncUtilities.GetDateCurrent();
            if (tuNgay == null && denNgay == null)
            {
                List<KeyValuePair<string, dynamic>> columns1 = new List<KeyValuePair<string, dynamic>>();
                DateTime dt = DateTime.Now;

                columns1.Add(new KeyValuePair<string, dynamic>("MONTH(dateCreated)", dt.Month));
                columns1.Add(new KeyValuePair<string, dynamic>("YEAR(dateCreated)", dt.Year));

                var result1 = await _top5CustomerRepository.TKTop5Customer(columns1);
                return new ResponseEntity(StatusCodeConstants.OK, result1, MessageConstants.MESSAGE_SUCCESS_200);
            }
            else
            {
                if (tuNgay != null)
                {
                    try
                    {
                        dtTuNgay = FuncUtilities.ConvertStringToDate(tuNgay);
                    }
                    catch (Exception ex)
                    {

                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ", MessageConstants.MESSAGE_ERROR_400);


                    }
                }
                if (denNgay != null)
                {
                    try
                    {
                        dtDenNgay = FuncUtilities.ConvertStringToDate(denNgay);
                    }
                    catch (Exception ex)
                    {
                        //return new ResponseEntity(StatusCodeConstants.OK, "Ngày không hợp lệ", MessageConstant.MESSAGE_SUCCESS_200);

                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ, Ngày có định dạng dd/MM/yyyy !", MessageConstants.MESSAGE_ERROR_400);
                    }

                }
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

                columns.Add(new KeyValuePair<string, dynamic>("dateCreated >", dtTuNgay.Date));
                columns.Add(new KeyValuePair<string, dynamic>("dateCreated <", dtDenNgay.Date));
                columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
                var result = await _top5CustomerRepository.TKTop5Customer(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }





        }
        public async Task<ResponseEntity> Top5ProductBc(string tuNgay = null, string denNgay = null)
        {
            DateTime dtTuNgay = FuncUtilities.GetDateCurrent();
            DateTime dtDenNgay = FuncUtilities.GetDateCurrent();
            if (tuNgay == null && denNgay == null)
            {
                List<KeyValuePair<string, dynamic>> columns1 = new List<KeyValuePair<string, dynamic>>();
                DateTime dt = DateTime.Now;

                columns1.Add(new KeyValuePair<string, dynamic>("MONTH(o.dateCreated)", dt.Month));
                columns1.Add(new KeyValuePair<string, dynamic>("YEAR(o.dateCreated)", dt.Year));
                columns1.Add(new KeyValuePair<string, dynamic>("o.statusId", 14));

                var result1 = await _top5ProductBCRepository.TKTop5ProductBC(columns1);
                return new ResponseEntity(StatusCodeConstants.OK, result1, MessageConstants.MESSAGE_SUCCESS_200);
            }
            else
            {
                if (tuNgay != null)
                {
                    try
                    {
                        dtTuNgay = FuncUtilities.ConvertStringToDate(tuNgay);
                    }
                    catch (Exception ex)
                    {

                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ", MessageConstants.MESSAGE_ERROR_400);


                    }
                }
                if (denNgay != null)
                {
                    try
                    {
                        dtDenNgay = FuncUtilities.ConvertStringToDate(denNgay);
                    }
                    catch (Exception ex)
                    {
                        //return new ResponseEntity(StatusCodeConstants.OK, "Ngày không hợp lệ", MessageConstant.MESSAGE_SUCCESS_200);

                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Ngày không hợp lệ, Ngày có định dạng dd/MM/yyyy !", MessageConstants.MESSAGE_ERROR_400);
                    }

                }
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();

                columns.Add(new KeyValuePair<string, dynamic>("o.dateCreated >", dtTuNgay.Date));
                columns.Add(new KeyValuePair<string, dynamic>("o.dateCreated <", dtDenNgay.Date));
                columns.Add(new KeyValuePair<string, dynamic>("statusId !", 14));
                var result = await _top5ProductBCRepository.TKTop5ProductBC(columns);
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);
            }




        }















    }


}
