using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class Bills
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int supplierId { get; set; }
        public int total  { get; set; }



        public int statusId { get; set; }
    
        public bool deleted { get; set; }
        public DateTime dateCreated { get; set; }


        //

    }
    public class BillsViewModel
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int supplierId { get; set; }
        public int total { get; set; }
      
        public string userName { get; set; }
     
        public string supplierName { get; set; }


        public int statusId { get; set; }
        public string statusName { get; set; }
        public DateTime created_at { get; set; }
        public List<Editors> lstEditor = new List<Editors>();





    }
  public class Editors
    {
        public int id { get; set; }
        public int billId { get; set; }


        public int userId { get; set; }
        public string userNameEditoer { get; set; }
        public string avatar { get; set; }


        public int statusId { get; set; }
        public string statusNames { get; set; }
        public DateTime updated_at { get; set; }


    }



    public class BillModelInsert
        {

            public int userId { get; set; }
            public int supplierId { get; set; }
            public int total { get; set; }
      

        public int statusId { get; set; }



        }

    public class BillModelUpdate
    {

        public int id { get; set; }



      




        public int statusId { get; set; }



    }




    public class BillModelDelete
        {
            public int id { get; set; }

        }
    
}
