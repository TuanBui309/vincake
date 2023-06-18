using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class Orders
    {
        public int id { get; set; }
        public int customerId { get; set; }

        public int addressId { get; set; }
        public int statusId { get; set; }
        public int total { get; set; }
        public bool deleted { get; set; }
        public DateTime dateCreated { get; set; }

        //

    }
    public class OrdersViewModel {
        public int id { get; set; }
        public int customerId { get; set; }
        public ShippingAddress address1 = new ShippingAddress();
        public Customer customers=new Customer();
        public int total { get; set; }

        public int statusId { get; set; }
        public string created_at { get; set; }

        public StatusOrder status1 = new StatusOrder();
        public List<EditorsOrder> lstEditor = new List<EditorsOrder>();
        public List<DetailOrders> orderDetails = new List<DetailOrders>();

    }
    public class EditorsOrder
    {
        public int id { get; set; }
        public int orderId { get; set; }


        public int userId { get; set; }
        public string userNameEditoer { get; set; }
        public string avatar { get; set; }


        public int statusId { get; set; }
        public string statusNames { get; set; }
        public DateTime updated_at { get; set; }


    }
    public class OrderDetail {
        public int id { get; set; }
        public int nameProduct { get; set; }
        public string image { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }



    }
    public class HuyDonHang
    {
        public int statusId { get; set; }



    }
    public class lstStatus {
        public int id { get; set; }
        public string statusName { get; set; }
       

    }



    public class HistoryViewModel {
        public int id { get; set; }
        public int customerId { get; set; }

        public int addressId { get; set; }
        public int statusId { get; set; }
        public DateTime dateCreated { get; set; }
        public List<lstAddress> lstAddress = new List<lstAddress>();
        public List<lstDetailOrder> lstDetail = new List<lstDetailOrder>();






    }
    public class lstDetailOrder {
        public int id { get; set; }
        public int productId { get; set; }
        public string nameProduct { get; set; }

        public string image { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
    }

    public class lstAddress {
        public int id { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
    }
 


    public class OrdersModelInsert
    {


        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public int total { get; set; }
        public string ward { get; set; }



    }
    public class Shipping_Address {
        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public string ward { get; set; }

    }
    


    public class OrderModelUpdate
    {

        public int id { get; set; }

    



        public int statusId { get; set; }



    }
    public class OrdersModelDelete
    {
        public int id { get; set; }

    }
}
