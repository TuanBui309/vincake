using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface ITop5ProductBCRepository : IRepository<Top5ProductBC>
    {

    }
    public class Top5ProductBCRepository : RepositoryBase<Top5ProductBC>, ITop5ProductBCRepository
    {
        public Top5ProductBCRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
