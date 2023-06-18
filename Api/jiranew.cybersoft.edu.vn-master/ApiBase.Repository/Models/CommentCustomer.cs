using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class CommentCustomer
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int productId { get; set; }
        public string contentComment { get; set; }
        public bool deleted { get; set; }
        public string alias { get; set; }
        public DateTime dateCreated { get; set; }
    }

    public class CommentCustomerViewModel
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int productId { get; set; }
        public string contentComment { get; set; }
        public bool deleted { get; set; }
        public string alias { get; set; }

        public UserComment user = new UserComment();
    }

    public class CustomerComment
    {
        public int userId { get; set; }
        public string name { get; set; }
        public string avatar { get; set; }
    }

    public class CommentCustomerModel
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string contentComment { get; set; }
    }

    public class CommentCustomerModelInsert
    {
        public int productId { get; set; }
        public string contentComment { get; set; }
    }

    public class CommentCustomerModelUpdate
    {
        public int id { get; set; }

        public string contentComment { get; set; }

    }
    public class CommentCustomerModelDelete
    {
        public int id { get; set; }

    }
}
