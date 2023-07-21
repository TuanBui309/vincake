using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Constants;
using ApiBase.Service.Infrastructure;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.Utilities;
using ApiBase.Service.ViewModels;
using ApiBase.Service.ViewModels.ProjectViewModel;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Service.Services.SupplierService
{

    public interface ISupplierService : IService<Supplier, Supplier>
    {
        Task<ResponseEntity> getAllSupplier();
        Task<ResponseEntity> insertSupplier(SupplierInsert model, string token);
        Task<ResponseEntity> deleteSupplier(int idSupplier, string token);
       
        Task<ResponseEntity> updateSupplier(SupplierUpdate model, string token);

    }
    public class SupplierService : ServiceBase<Supplier, Supplier>, ISupplierService
    {
        ISupplierRepository _suppliersRepository;
        IUserService _userService;
        IFileService _fileService;
        IUserJiraRepository _userJira;

        public SupplierService(ISupplierRepository sup, IUserService userService, IFileService fileSv,
            IMapper mapper)
            : base(sup, mapper)
        {
            _suppliersRepository = sup;
            _fileService = fileSv;
            _userService = userService;


        }
        public Task<ResponseEntity> getAllSupplier()
        {
            throw new NotImplementedException();
        }


        public async Task<ResponseEntity> deleteSupplier(int idSupplier, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                Supplier suppliers = await _suppliersRepository.GetSingleByIdAsync(idSupplier);

                if (suppliers == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "suppliers is not found", MessageConstants.MESSAGE_ERROR_404);

                }

                await _suppliersRepository.DeleteByIdAsync(new List<dynamic>() { idSupplier });
                return new ResponseEntity(StatusCodeConstants.OK, "Deleted idSupplier success", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, " idSupplier is not found", MessageConstants.INSERT_ERROR);
            }
        }
        //public async Task<ResponseEntity> getCategoriesById(int idCategories, string token)
        //{
        //    try
        //    {
        //        var userJira = await _userService.getUserByToken(token);
        //        Categories category = await _categoriesRepository.GetSingleByIdAsync(idCategories);

        //        if (category == null)
        //        {
        //            return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Category is not found", MessageConstants.MESSAGE_ERROR_404);

        //        }


        //        return new ResponseEntity(StatusCodeConstants.OK, category, MessageConstants.MESSAGE_SUCCESS_200);

        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Category is not found", MessageConstants.INSERT_ERROR);
        //    }
        //}

        private const int TenMegaBytes = 1024 * 1024;
        //public string UploadHinhAnh(IFormFile file, string tenBanh)
        //{
        //    file = Request.Form.Files[0];
        //    //tenPhim = Request.Form["tenPhim"];
        //    //maNhom = Request.Form["maNhom"];

        //    tenBanh = FuncUtilities.BestLower(tenBanh);

        //    if (string.IsNullOrEmpty(tenBanh))
        //    {
        //        //return await tbl.TBLoi(ThongBaoLoi.Loi500, "Tên phim không hợp lệ");

        //        //return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Tên phim không hợp lệ", MessageConstant.INSERT_ERROR);

        //        return "Tên phim không hợp lệ";

        //    }



        //    if (file.Length > TenMegaBytes)
        //    {
        //        //return await tbl.TBLoi(ThongBaoLoi.Loi500, "Dung lượng file vượt quá 1 MB!");
        //        //return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Dung lượng file vượt quá 1 MB!", MessageConstant.INSERT_ERROR);

        //        return "Dung lượng file vượt quá 1 MB!";
        //    }
        //    if (file.ContentType == "image/png" || file.ContentType == "image/jpeg" || file.ContentType == "image/jpg" || file.ContentType == "image/gif")
        //    {
        //        try
        //        {


        //            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/hinhanh", tenBanh + "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1]);
        //            var stream = new FileStream(path, FileMode.Create);
        //            file.CopyTo(stream);

        //            return "";

        //        }
        //        catch (Exception ex)
        //        {

        //            return "Upload file không thành công!";

        //        }
        //    }
        //    else
        //    {


        //        return "Định dạng file không hợp lệ!";
        //    }
        //}
        public async Task<ResponseEntity> insertSupplier(SupplierInsert model, string token)
        {
            try
            {
                var userJira = _userService.getUserByToken(token).Result;
                var DomainImage = "https://localhost:44366/cmnd/";


                Supplier suppliers = new Supplier();

                suppliers.name = model.name;
                suppliers.phone = model.phone;
                suppliers.address = model.address;
                suppliers.phone = model.phone;
                suppliers.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);








                suppliers = await _suppliersRepository.InsertAsync(suppliers);
                if (suppliers == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);

                return new ResponseEntity(StatusCodeConstants.OK, model, MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "Unauthorize", MessageConstants.MESSAGE_ERROR_401);

            }
        }


        public async Task<ResponseEntity> updateSupplier(SupplierUpdate model, string token)
        {
            try
            {
                var DomainImage = "https://localhost:44366/cmnd/";
                var userJira = _userService.getUserByToken(token);
                Supplier suppliers = _suppliersRepository.GetSingleByConditionAsync("id", model.id).Result;
                if (suppliers == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Categories is not found !", MessageConstants.MESSAGE_ERROR_500);
                }


                suppliers.name = model.name;
                suppliers.phone = model.phone;
                suppliers.address = model.name;
                suppliers.phone = model.phone;

                await _suppliersRepository.UpdateAsync(suppliers.id, suppliers);



                return new ResponseEntity(StatusCodeConstants.OK, suppliers, MessageConstants.UPDATE_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Update fail", MessageConstants.UPDATE_ERROR);

            }
        }
    }

}
