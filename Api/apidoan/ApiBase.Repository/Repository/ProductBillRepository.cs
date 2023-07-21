using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IProductBillRepository : IRepository<ProductBill>
    {

    }
    public class ProductBillRepository : RepositoryBase<ProductBill>, IProductBillRepository
    {
        public ProductBillRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
