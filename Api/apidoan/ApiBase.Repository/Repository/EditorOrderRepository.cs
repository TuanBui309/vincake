using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IEditorOrderRepository : IRepository<EditorOrder>
    {

    }
    public class EditorOrderRepository : RepositoryBase<EditorOrder>, IEditorOrderRepository
    {
        public EditorOrderRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
