using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IThongKeTCRepository : IRepository<ThongKeThuChi>
    {

    }
    public class ThongKeTCRepository : RepositoryBase<ThongKeThuChi>, IThongKeTCRepository
    {
        public ThongKeTCRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
