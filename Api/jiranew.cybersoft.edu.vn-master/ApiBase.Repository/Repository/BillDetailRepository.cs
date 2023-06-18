using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IBillDetailRepository : IRepository<BillDetails>
    {

    }
    public class BillDetailRepository : RepositoryBase<BillDetails>, IBillDetailRepository
    {
        public BillDetailRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
