using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string name { get; set; }
        public string passWord { get; set; }
        public string avatar { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public bool deleted { get; set; }
        public string alias { get; set; }
        public string verificationToken { get; set; }
        public DateTime verifiedAt { get; set; }
        public string facebookId { get; set; }
        public DateTime dateCreated { get; set; }
    }
    public class CustomerModel
    {
        public string email { get; set; }
        public string passWord { get; set; }
        public string name { get; set; }
      
        public string phoneNumber { get; set; }
    }
    public class CustomerModelUpdate
    {
        public string id { get; set; }

        public string passWord { get; set; }
        public string email { get; set; }
        public string name { get; set; }
        public string phoneNumber { get; set; }
    }
    public class CustomerModelForgerPassword
    {
   


        public string email { get; set; }

       
    }
    public class ResetPasswordModel
    {
        public string verificationToken { get; set; }
        public string passWord { get; set; }


    }


    public class CustomerLogin
    {
        public string email { get; set; }
        public string passWord { get; set; }
       

    }

    public class CustomerModelView
    {
        public int id { get; set; }
        public string email { get; set; }
        public string avatar { get; set; }
        public string phoneNumber { get; set; }

        public string name
        {
            get; set;
        }
        public string accessToken { get; set; }
    }
    public class CustomerLoginResult
    {
        public string email { get; set; }
        public string accessToken { get; set; }

    }
}
