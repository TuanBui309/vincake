using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Constants;
using ApiBase.Service.Infrastructure;
using ApiBase.Service.Services.CustomerService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.Utilities;
using ApiBase.Service.ViewModels;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Service.Services.CommentCustomerService
{

    public interface ICommentCustomerService : IService<CommentCustomer, CommentCustomer>
    {
        Task<ResponseEntity> getCommentByProduct(int productId = 0);
        Task<ResponseEntity> insertComment(CommentCustomerModelInsert model, string token);
        Task<ResponseEntity> deleteComment(int idComment, string token);
        Task<ResponseEntity> updateComment(CommentCustomerModelUpdate commentUpdate, string token);

    }
    public class CommentCustomerService : ServiceBase<CommentCustomer, CommentCustomer>, ICommentCustomerService
    {
        ICommentCustomerRepository _commentCustomerRepository;
        ICustomerService _customerService;
        ICustomerRepository _customerRepository;
        public CommentCustomerService(ICommentCustomerRepository proRe, ICustomerService customerService, ICustomerRepository customerR,
            IMapper mapper)
            : base(proRe, mapper)
        {
            _commentCustomerRepository = proRe;
            _customerService = customerService;
            _customerRepository = customerR;
        }


        public async Task<ResponseEntity> deleteComment(int idComment, string token)
        {
            try
            {
                var userJira = await _customerService.getCustomerByToken(token);
                CommentCustomer comment = await _commentCustomerRepository.GetSingleByIdAsync(idComment);

                if (comment == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Comment is not found", MessageConstants.MESSAGE_ERROR_404);

                }
                if (comment.userId != userJira.id)
                {
                    return new ResponseEntity(StatusCodeConstants.FORBIDDEN, "403 Forbidden !", MessageConstants.MESSAGE_ERROR_500);

                }
                await _commentCustomerRepository.DeleteByIdAsync(new List<dynamic>() { idComment });
                return new ResponseEntity(StatusCodeConstants.OK, "Deleted comment success", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Comment is not found", MessageConstants.INSERT_ERROR);
            }
        }

        public async Task<ResponseEntity> getCommentByProduct(int productId)
        {
            try
            {
                var result = _commentCustomerRepository.GetMultiByConditionAsync("productId", productId).Result;

                List<CommentCustomerViewModel> lstComment = new List<CommentCustomerViewModel>();
                foreach (var item in result)
                {
                    var user = _customerRepository.GetSingleByConditionAsync("id", item.userId).Result;

                    CommentCustomerViewModel cmt = new CommentCustomerViewModel();
                    cmt.alias = item.alias;
                    cmt.contentComment = FuncUtilities.Base64Decode(item.contentComment);
                    cmt.id = item.id;
                    cmt.productId = item.productId;
                    cmt.userId = item.userId;
                    cmt.user.userId = user.id;
                    cmt.user.avatar = user.avatar;
                    cmt.user.name = user.name;


                    lstComment.Add(cmt);
                }
                return new ResponseEntity(StatusCodeConstants.OK, lstComment, MessageConstants.MESSAGE_SUCCESS_200);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Comment is not found", MessageConstants.INSERT_ERROR);
            }
        }

        public async Task<ResponseEntity> insertComment(CommentCustomerModelInsert model, string token)
        {
            try
            {
                var userJira = _customerService.getCustomerByToken(token).Result;
                CommentCustomer cmt = new CommentCustomer();
                cmt.alias = FuncUtilities.BestLower(model.contentComment);
                cmt.deleted = false;
                cmt.contentComment = FuncUtilities.Base64Encode(model.contentComment);
                cmt.userId = userJira.id;
                cmt.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                cmt.productId = model.productId;
                cmt = await _commentCustomerRepository.InsertAsync(cmt);
                if (cmt == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);
                cmt.contentComment = FuncUtilities.Base64Decode(cmt.contentComment);
                return new ResponseEntity(StatusCodeConstants.OK, cmt, MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "Unauthorize", MessageConstants.MESSAGE_ERROR_401);

            }
        }


        public async Task<ResponseEntity> updateComment(CommentCustomerModelUpdate commentUpdate, string token)
        {
            try
            {
                var userJira = _customerService.getCustomerByToken(token);
                CommentCustomer cmt = _commentCustomerRepository.GetSingleByConditionAsync("id", commentUpdate.id).Result;
                if (cmt == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Comment is not found !", MessageConstants.MESSAGE_ERROR_500);
                }
                if (cmt.userId != userJira.Result.id)
                {
                    return new ResponseEntity(StatusCodeConstants.FORBIDDEN, "403 Forbidden !", MessageConstants.MESSAGE_ERROR_500);
                }

                cmt.contentComment = FuncUtilities.Base64Encode(commentUpdate.contentComment);
                cmt.alias = FuncUtilities.BestLower(cmt.contentComment);

                await _commentCustomerRepository.UpdateAsync(cmt.id, cmt);

                cmt.contentComment = FuncUtilities.Base64Decode(cmt.contentComment);

                return new ResponseEntity(StatusCodeConstants.OK, cmt, MessageConstants.UPDATE_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Update fail", MessageConstants.UPDATE_ERROR);

            }
        }
    }

}
