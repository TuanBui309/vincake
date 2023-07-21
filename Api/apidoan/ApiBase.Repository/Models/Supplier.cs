using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class Supplier
    {
        public int id { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public bool deleted { get; set; }
        public DateTime dateCreated { get; set; }

    }
    public class SupplierInsert
    {

        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }


    }
    public class SupplierUpdate
    {
        public int id { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }

    }
    public class SupplierDelete
    {
        public int id { get; set; }
     

    }

}
