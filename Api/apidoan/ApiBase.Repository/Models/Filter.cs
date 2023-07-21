using Microsoft.AspNetCore.Http;
namespace ApiBase.Repository.Models
{
    public class Filter
    {
        public string Column { get; set; }
        public string Value { get; set; }
    }
}