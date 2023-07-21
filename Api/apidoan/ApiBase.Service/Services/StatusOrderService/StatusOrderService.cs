using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Constants;
using ApiBase.Service.Infrastructure;
using ApiBase.Service.ViewModels;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Service.Services.StatusService
{
    public interface IStatusOrderService : IService<StatusOrder, StatusOrder>
    {

        Task<ResponseEntity> getAll( string token);





    }
    public class StatusOrderService : ServiceBase<StatusOrder, StatusOrder>, IStatusOrderService
    {
        IStatusOrderRepository _statusOrderRepository;
        public StatusOrderService(IStatusOrderRepository status,
            IMapper mapper)
            : base(status, mapper)
        {
            _statusOrderRepository = status;

        }

        public async Task<ResponseEntity> getAll( string token)
        {
            var result = _statusOrderRepository.GetAllAsync().Result;
            return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

        }
    }
}
