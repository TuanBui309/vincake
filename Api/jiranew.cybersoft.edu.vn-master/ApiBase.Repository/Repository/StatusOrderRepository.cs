using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IStatusOrderRepository : IRepository<StatusOrder>
    {

    }
    public class StatusrOderRepository : RepositoryBase<StatusOrder>, IStatusOrderRepository
    {
        public StatusrOderRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
