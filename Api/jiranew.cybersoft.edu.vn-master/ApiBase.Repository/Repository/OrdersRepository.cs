using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IOrderRepository : IRepository<Orders>
    {

    }
    public class OrderRepository : RepositoryBase<Orders>, IOrderRepository
    {
        public OrderRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
