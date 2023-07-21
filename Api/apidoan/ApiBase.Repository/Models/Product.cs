using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Repository.Models
{
    public class Product
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
        public DateTime dateCreated { get; set; }


    }
    public class ProductViewModel
    {
        public int id { get; set; } = 0;
        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
        public string tenLoai { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public string image { get; set; } = "";
        public bool deleted { get; set; }


    }
    public class ProductView
    {
        public int productId { get; set; } = 0;
        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
        public string tenLoai { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public string image { get; set; } = "";
        public bool deleted { get; set; }


    }
    public class ProductInsert {
   
        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public IFormFile image { get; set; }
    }
    public class ProductUpdate
    {
        public int id { get; set; } = 0;
        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public IFormFile image { get; set; }
    }

    public class Productdelete
    {
        public int id { get; set; } = 0;

    }


    public class ProductDetail
    {
        public int id { get; set; } = 0;
        public Categories category { get; set; }
        public string tenSP { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public string image { get; set; } = "";
        public List<CommentProduct> lstComment = new List<CommentProduct>();
        public List<RelatedProducts> related = new List<RelatedProducts>();
       


    }
    public class RelatedProducts {
        public int id { get; set; } = 0;
        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public string image { get; set; } = "";




    }
    public class CommentProduct
    {
        public int id { get; set; }

        public int idUser { get; set; }
        public string name { get; set; }
        public string avatar { get; set; }
        public string commentContent { get; set; }
        public string created_at { get; set; }

    }








}
