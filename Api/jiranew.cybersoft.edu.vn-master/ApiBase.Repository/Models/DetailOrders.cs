using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class DetailOrders
    {
        public int id { get; set; }
        public int orderId { get; set; }
        public int productId { get; set; }
        public string nameProduct { get; set; }

        public string image { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
        public bool deleted { get; set; }
        public DateTime dateCreated { get; set; }
    }
    public class DetailOrderInsert {
        public int productId { get; set; }
        public string nameProduct { get; set; }
        public string image { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
    }

}
