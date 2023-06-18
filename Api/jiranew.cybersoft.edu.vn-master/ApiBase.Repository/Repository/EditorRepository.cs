using ApiBase.Repository.Infrastructure;
using ApiBase.Repository.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Repository
{
    public interface IEditorRepository : IRepository<Editor>
    {

    }
    public class EditorRepository : RepositoryBase<Editor>, IEditorRepository
    {
        public EditorRepository(IConfiguration configuration)
            : base(configuration)
        {

        }
    }
}
