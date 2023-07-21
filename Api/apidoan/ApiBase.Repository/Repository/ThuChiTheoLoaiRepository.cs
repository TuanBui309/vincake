using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface ITCTheoLoaiRepository : IRepository<ThuChiTheoLoai>
    {

    }
    public class TCTheoLoaiRepository : RepositoryBase<ThuChiTheoLoai>, ITCTheoLoaiRepository
    {
        public TCTheoLoaiRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
