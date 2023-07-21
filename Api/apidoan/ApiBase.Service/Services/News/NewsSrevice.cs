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

namespace ApiBase.Service.Services.NewsService
{

    public interface INewsService : IService<News, News>
    {
        Task<ResponseEntity> getAllNews();
        Task<ResponseEntity> insertNews(NewsInsert model, string token);
        Task<ResponseEntity> deleteNews(int idNews, string token);
        Task<ResponseEntity> getNewsById(int idNews, string token);
        Task<ResponseEntity> updateNews(NewsUpdate model, string token);

    }
    public class NewsService : ServiceBase<News, News>, INewsService
    {
        INewsRepository _newsRepository;
        IUserService _userService;
        IFileService _fileService;
        IUserJiraRepository _userJira;

        public NewsService(INewsRepository newsRe, IUserService userService, IFileService fileSv, IUserJiraRepository UserRe,
            IMapper mapper)
            : base(newsRe, mapper)
        {
            _newsRepository = newsRe;
            _fileService = fileSv;
            _userService = userService;
            _userJira = UserRe;


        }
        public async Task<ResponseEntity> getAllNews()
        {
            var lstNews = await _newsRepository.GetAllAsync();
            var listResult = new List<NewsViewModel>();
            foreach (var n in lstNews)
            {
                var result = new NewsViewModel { id = n.id, userId = n.userId,image=n.image,NoiDung=n.NoiDung,MoTa=n.MoTa, user1 = _userJira.GetSingleByConditionAsync("id", n.userId).Result,dateCreated=n.dateCreated };
                listResult.Add(result);
            }
            return new ResponseEntity(StatusCodeConstants.OK, listResult, MessageConstants.MESSAGE_SUCCESS_200);
        }


        public async Task<ResponseEntity> deleteNews(int idNews, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                News news = await _newsRepository.GetSingleByIdAsync(idNews);

                if (news == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "News is not found", MessageConstants.MESSAGE_ERROR_404);

                }

                await _newsRepository.DeleteByIdAsync(new List<dynamic>() { idNews });
                return new ResponseEntity(StatusCodeConstants.OK, "Deleted news success", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "news is not found", MessageConstants.INSERT_ERROR);
            }
        }
        public async Task<ResponseEntity> getNewsById(int idNews, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                News news = await _newsRepository.GetSingleByIdAsync(idNews);

                if (news == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "news is not found", MessageConstants.MESSAGE_ERROR_404);

                }


                
               
                    var result = new NewsDetailViewModel { id = news.id, userId = news.userId, image = news.image, NoiDung = news.NoiDung, MoTa = news.MoTa, user1 = _userJira.GetSingleByConditionAsync("id", news.userId).Result, dateCreated = news.dateCreated };
                    
                
                return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "news is not found", MessageConstants.INSERT_ERROR);
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
        public async Task<ResponseEntity> insertNews(NewsInsert model, string token)
        {
            try
            {
                var userJira = _userService.getUserByToken(token).Result;
                UserJira user = _userService.getUserByToken(token).Result;
                var DomainImage = "https://localhost:44366/cmnd/";


                News news = new News();

                news.NoiDung = model.NoiDung;
                news.userId = user.id;
                news.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);

                news.MoTa = model.MoTa;
                news.image = DomainImage + FuncUtilities.BestLower(model.image.FileName) + "." + model.image.FileName.Split('.')[model.image.FileName.Split('.').Length - 1];

                _fileService.UploadCmndAsync(model.image);





                news = await _newsRepository.InsertAsync(news);
                if (news == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);

                return new ResponseEntity(StatusCodeConstants.OK, model, MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "Unauthorize", MessageConstants.MESSAGE_ERROR_401);

            }
        }


        public async Task<ResponseEntity> updateNews(NewsUpdate model, string token)
        {
            try
            {
                var DomainImage = "https://localhost:44366/cmnd/";
                var userJira = _userService.getUserByToken(token);
                News news = _newsRepository.GetSingleByConditionAsync("id", model.id).Result;
                if (news == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Categories is not found !", MessageConstants.MESSAGE_ERROR_500);
                }


                news.NoiDung = model.NoiDung;
              
                news.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                news.image = DomainImage + FuncUtilities.BestLower(model.image.FileName) + "." + model.image.FileName.Split('.')[model.image.FileName.Split('.').Length - 1];

                _fileService.UploadCmndAsync(model.image);
                news.MoTa = model.MoTa;
                await _newsRepository.UpdateAsync(news.id, news);



                return new ResponseEntity(StatusCodeConstants.OK, news, MessageConstants.UPDATE_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Update fail", MessageConstants.UPDATE_ERROR);

            }
        }
    }

}
