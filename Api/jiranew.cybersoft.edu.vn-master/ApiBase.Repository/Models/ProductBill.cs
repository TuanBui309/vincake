using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class ProductBill
    {
        public int id { get; set; } = 0;
        public int productId { get; set; } = 0;
        public int userId { get; set; } = 0;
        public string name { get; set; } = "";
        public int price { get; set; } = 0;
        public int quantity { get; set; } = 0;
       
        public string image { get; set; } = "";
        public bool deleted { get; set; }
        public DateTime dateCreated { get; set; }

    }
  
    public class ProductBillViewModel
    {
        public int id { get; set; } = 0;
        public int productId { get; set; } = 0;
        public string name { get; set; } = "";
        public int price { get; set; } = 0;
        public int quantity { get; set; } = 0;

        public string image { get; set; } = "";
        


    }
    public class ProductBillInsert
    {

        public int productId { get; set; } = 0;
       
        public int price { get; set; } = 0;
        public int quantity { get; set; } = 0;

        
       
    }
    public class NewProductBillInsert
    {

        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
       
     
        public IFormFile image { get; set; }

        public int price { get; set; } = 0;
        public int quantity { get; set; } = 0;


      
    }
}
