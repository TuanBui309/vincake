using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class Cart
    {
        public int id { get; set; }
        public int customerId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }
        public bool deleted { get; set; }
        public DateTime dateCreated { get; set; }
    }

    public class CartViewModel
    {
        public int id { get; set; }
        public int customerId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }
        public int subTotal { get; set; }



        public ProductCart productcarts = new ProductCart();
   
    }
    

    public class CustomerCart
    {
        public int customerId { get; set; }
        public string name { get; set; }
        public string avatar { get; set; }
    }
    public class ProductCart
    {
        public int id { get; set; } = 0;
        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public string image { get; set; } = "";
        public bool deleted { get; set; }
    }

    public class CartModel
    {
        public int id { get; set; }
        public int customerId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }
        public bool deleted { get; set; }
    }

    public class CartModelInsert
    {

        public int customerId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }

    }

    public class CartModelUpdate
    {
        public int id { get; set; }
        public int customerId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }
        public bool deleted { get; set; }

    }
    public class CartModelDelete
    {
        public int id { get; set; }

    }
}
