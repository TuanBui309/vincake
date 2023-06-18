using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IShippingAddressRepository : IRepository<ShippingAddress>
    {

    }
    public class ShippingAddressRepository : RepositoryBase<ShippingAddress>, IShippingAddressRepository
    {
        public ShippingAddressRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
