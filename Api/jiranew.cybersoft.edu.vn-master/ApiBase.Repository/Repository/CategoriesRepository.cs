using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface ICategoriesRepository : IRepository<Categories>
    {

    }
    public class CategoriesRepository : RepositoryBase<Categories>, ICategoriesRepository
    {
        public CategoriesRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
