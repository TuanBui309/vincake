using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IDetailOrderRepository : IRepository<DetailOrders>
    {

    }
    public class DetailOrdertRepository : RepositoryBase<DetailOrders>, IDetailOrderRepository
    {
        public DetailOrdertRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
