using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.AspNetCore.Http;
namespace ApiBase.Repository.Models
{
    public class News
    {
        public int id { get; set; } = 0;
        public int userId { get; set; } = 0;

        public string NoiDung { get; set; } = "";
        public string image { get; set; } = "";

        public bool deleted { get; set; }
        public string MoTa { get; set; } = "";

        public DateTime dateCreated { get; set; }

    }
    public class NewsViewModel
    {
        public int id { get; set; } = 0;
        public int userId { get; set; } = 0;
        public UserJira user1 = new UserJira();

        public string NoiDung { get; set; } = "";
        public string image { get; set; } = "";

        public bool deleted { get; set; }
        public string MoTa { get; set; } = "";

        public DateTime dateCreated { get; set; }

    }
    public class NewsDetailViewModel
    {
        public int id { get; set; } = 0;
        public int userId { get; set; } = 0;
        public UserJira user1 = new UserJira();

        public string NoiDung { get; set; } = "";
        public string image { get; set; } = "";

        public bool deleted { get; set; }
        public string MoTa { get; set; } = "";

        public DateTime dateCreated { get; set; }

    }
    public class NewsInsert
    {

        public string NoiDung { get; set; } = "";
        public IFormFile image { get; set; }

        public string MoTa { get; set; } = "";

    }
    public class NewsUpdate
    {
        public int id { get; set; } = 0;

        public string NoiDung { get; set; } = "";
        public IFormFile image { get; set; }


        public string MoTa { get; set; } = "";

    }


    public class NewsModelDelete
    {
        public int id { get; set; }

    }
}

