using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface INewsRepository : IRepository<News>
    {

    }
    public class NewsRepository : RepositoryBase<News>, INewsRepository
    {
        public NewsRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
