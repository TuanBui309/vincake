using System;
using System.Collections.Generic;
using System.Text;

namespace ApiBase.Service.ViewModels.ProductViewModel
{
    public class ProductViewModel
    {

        public int id { get; set; } = 0;
        public int? maLoai { get; set; } = 0;
        public string tenSP { get; set; } = "";
        public int giaBan { get; set; } = 0;
        public int sale { get; set; } = 0;
        public int soLuong { get; set; } = 0;
        public string tinhTrang { get; set; } = "";
        public string image { get; set; } = "";

    }
}
