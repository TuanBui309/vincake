using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.AspNetCore.Http;
namespace ApiBase.Repository.Models
{
    public class Categories
    {
        public int id { get; set; } = 0;
        public string tenLoai { get; set; } = "";
        public string image { get; set; } = "";
        public bool deleted { get; set; }
   
        public DateTime dateCreated { get; set; }

    }

    public class CategoriesInsert
        {
           
            public string tenLoai { get; set; } = "";
            public IFormFile image { get; set; }

    }
    public class CategoriesUpdate
    {
        public int id { get; set; } = 0;

        public string tenLoai { get; set; } = "";
        public IFormFile image { get; set; }

    }


    public class CategoriesModelDelete
    {
        public int id { get; set; }

    }
}

