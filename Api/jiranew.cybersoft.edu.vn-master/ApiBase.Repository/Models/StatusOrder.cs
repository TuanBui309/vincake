using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class StatusOrder
    {
        public int id { get; set; }
        public string statusName { get; set; }
        public string alias { get; set; }
        public string deleted { get; set; }
        public DateTime dateCreated { get; set; }
    }
}
