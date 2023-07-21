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

namespace ApiBase.Service.Services.CategoriesService
{

    public interface ICategoriesService : IService<Categories, Categories>
    {
        Task<ResponseEntity> getAllCategories();
        Task<ResponseEntity> insertCategories(CategoriesInsert model, string token);
        Task<ResponseEntity> deleteCategories(int idCategories, string token);
        Task<ResponseEntity> getCategoriesById(int idCategories, string token);
        Task<ResponseEntity> updateCategories(CategoriesUpdate model, string token);

    }
    public class CategoriesService : ServiceBase<Categories, Categories>, ICategoriesService
    {
        ICategoriesRepository _categoriesRepository;
        IUserService _userService;
        IFileService _fileService;
        IUserJiraRepository _userJira;

        public CategoriesService(ICategoriesRepository category ,IUserService userService, IFileService fileSv,
            IMapper mapper)
            : base(category, mapper)
        {
            _categoriesRepository = category;
            _fileService = fileSv;
            _userService = userService;


        }
        public Task<ResponseEntity> getAllCategories()
        {
            throw new NotImplementedException();
        }


        public async Task<ResponseEntity> deleteCategories(int idCategories, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                Categories category = await _categoriesRepository.GetSingleByIdAsync(idCategories);

                if (category == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Category is not found", MessageConstants.MESSAGE_ERROR_404);

                }
              
                await _categoriesRepository.DeleteByIdAsync(new List<dynamic>() { idCategories });
                return new ResponseEntity(StatusCodeConstants.OK, "Deleted comment success", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Comment is not found", MessageConstants.INSERT_ERROR);
            }
        }
        public async Task<ResponseEntity> getCategoriesById(int idCategories, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                Categories category = await _categoriesRepository.GetSingleByIdAsync(idCategories);

                if (category == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Category is not found", MessageConstants.MESSAGE_ERROR_404);

                }

               
                return new ResponseEntity(StatusCodeConstants.OK, category, MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Category is not found", MessageConstants.INSERT_ERROR);
            }
        }

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
        public async Task<ResponseEntity> insertCategories(CategoriesInsert model, string token)
        {
            try
            {
                var userJira = _userService.getUserByToken(token).Result;
                var DomainImage= "https://localhost:44366/cmnd/";


                Categories category = new Categories();
     
                category.tenLoai = model.tenLoai;
                category.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                category.image = DomainImage+ FuncUtilities.BestLower(model.image.FileName) + "." + model.image.FileName.Split('.')[model.image.FileName.Split('.').Length - 1];
              
              _fileService.UploadCmndAsync(model.image);





                category = await _categoriesRepository.InsertAsync(category);
                if (category == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);
                
                return new ResponseEntity(StatusCodeConstants.OK, model, MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "Unauthorize", MessageConstants.MESSAGE_ERROR_401);

            }
        }


        public async Task<ResponseEntity> updateCategories(CategoriesUpdate model, string token)
        {
            try
            {
                var DomainImage = "https://localhost:44366/cmnd/";
                var userJira = _userService.getUserByToken(token);
                Categories category = _categoriesRepository.GetSingleByConditionAsync("id", model.id).Result;
                if (category == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Categories is not found !", MessageConstants.MESSAGE_ERROR_500);
                }


                category.tenLoai = model.tenLoai;
                category.image = DomainImage + FuncUtilities.BestLower(model.image.FileName) + "." + model.image.FileName.Split('.')[model.image.FileName.Split('.').Length - 1];

                _fileService.UploadCmndAsync(model.image);

                await _categoriesRepository.UpdateAsync(category.id, category);

              

                return new ResponseEntity(StatusCodeConstants.OK, category, MessageConstants.UPDATE_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Update fail", MessageConstants.UPDATE_ERROR);

            }
        }
    }

}
