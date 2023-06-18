using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IBillRepository : IRepository<Bills>
    {

    }
    public class BillRepository : RepositoryBase<Bills>, IBillRepository
    {
        public BillRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
