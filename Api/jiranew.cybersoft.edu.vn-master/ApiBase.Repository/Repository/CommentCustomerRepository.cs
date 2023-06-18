using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface ICommentCustomerRepository : IRepository<CommentCustomer>
    {

    }
    public class CommentCustomerRepository : RepositoryBase<CommentCustomer>, ICommentCustomerRepository
    {
        public CommentCustomerRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
