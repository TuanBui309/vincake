using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface ICartRepository : IRepository<Cart> 
    {

    }
    public class CartRepository : RepositoryBase<Cart>, ICartRepository
    {
        public CartRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
