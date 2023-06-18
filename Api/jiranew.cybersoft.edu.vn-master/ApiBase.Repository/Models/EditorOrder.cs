﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class EditorOrder
    {
        public int id { get; set; }
        public int orderId { get; set; }

        public int userId { get; set; }

        public int statusId { get; set; }
        public DateTime dateCreated { get; set; }


        public bool deleted { get; set; }


    }


}
