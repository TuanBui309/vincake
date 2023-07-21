using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class ShippingAddress
    {
        public int id { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public bool deleted { get; set; }
        public DateTime dateCreated { get; set; }
      
    }

   
}
