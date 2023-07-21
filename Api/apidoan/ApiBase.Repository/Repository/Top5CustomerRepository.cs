using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface ITop5CustomerRepository : IRepository<Top5Customer>
    {

    }
    public class Top5CustomerRepository : RepositoryBase<Top5Customer>, ITop5CustomerRepository
    {
        public Top5CustomerRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
