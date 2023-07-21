using ApiBase.Repository.Models;

using System;
using System.Collections.Generic;
using System.Text;
using ApiBase.Service.Infrastructure;
using ApiBase.Repository.Repository;
using AutoMapper;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.Constants;
using ApiBase.Service.ViewModels;
using System.Threading.Tasks;
using System.Reflection;
using ApiBase.Service.Utilities;
using Microsoft.AspNetCore.Mvc;
using ApiBase.Service.ViewModels.ProjectViewModel;
using System.Linq;
using System.Globalization;

namespace ApiBase.Service.Services.ProductManagementService
{

    public interface IProductManagementService : IService<Product, Product>
    { 
        Task<ResponseEntity> getAllProduct();
        Task<ResponseEntity> TimKiem(string keyword = null,string filter = null);
        Task<ResponseEntity> insertProduct(ProductInsert model, string token);
        Task<ResponseEntity> deleteProduct(int idProduct, string token);
        Task<ResponseEntity> getProductById(int idProduct, string token);
        Task<ResponseEntity> getProductByIdCategories(int idCategories, string token);
        Task<ResponseEntity> updateProduct(ProductUpdate productUpdate, string token);
    

    }
    public class ProductManagementService : ServiceBase<Product, Product>, IProductManagementService
    {
        IProductRepository _productRepository;
     
        IFileService _fileService;
        ICommentCustomerRepository _commentcustomerRepository;
        ICategoriesRepository _categoriesRepository;
        IUserService _userService;
        IUserJiraRepository _userJira;
        ICustomerRepository _customerRepository;
        public ProductManagementService(IProductRepository proRe,IFileService fileSV, ICustomerRepository cusPRO, IUserService userService, ICategoriesRepository cate, ICommentCustomerRepository customerRo,
            IMapper mapper)
            : base(proRe, mapper)
        {
            _productRepository = proRe;
            _fileService = fileSV;
          
            _commentcustomerRepository = customerRo;
            _categoriesRepository = cate;
            _customerRepository = cusPRO;
            _userService = userService;

        }
        public async Task<ResponseEntity> TimKiem(string keyword = null,string filter=null)
        {
            IEnumerable<ProductViewModel> entity =  getAllProduct1().ToList();
            List<Product> products = new List<Product>();

            if (filter == null)
            {
                if (keyword != null)
                {
                    if (entity.Count() != 0)
                    {

                        TextInfo ti = CultureInfo.CurrentCulture.TextInfo;



                        List<ProductViewModel> lstTimTheoTenSP = entity.Where(n => n.tenSP.Contains(ti.ToTitleCase(keyword))).ToList();
                        List<ProductViewModel> lstTimTheoTenLoai = entity.Where(n => n.tenLoai.Contains(ti.ToTitleCase(keyword))).ToList();



                        List<ProductViewModel> lstTimTheoTinhTrang = entity.Where(n => n.tinhTrang.Contains(keyword)).ToList();

                        List<ProductViewModel> lstTimTheoMaLoai = entity.Where(n => n.maLoai.ToString().Contains(keyword)).ToList();

                        IEnumerable<ProductViewModel> result = new List<ProductViewModel>();
                        result = result.Union(lstTimTheoTenSP);
                        result = result.Union(lstTimTheoTenLoai);


                        result = result.Union(lstTimTheoMaLoai);



                        foreach (ProductViewModel item in result)
                        {
                            Product pro = new Product();
                            pro.id = item.id;
                            pro.maLoai = item.maLoai;
                            pro.tenSP = item.tenSP;
                            pro.image = item.image;
                            pro.giaBan = item.giaBan;
                            pro.sale = item.sale;
                            pro.soLuong = item.soLuong;
                            pro.tinhTrang = item.tinhTrang;


                            products.Add(pro);
                        }
                        return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);

                    }
                    return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);
                   

                }
                else
                {
                    return new ResponseEntity(StatusCodeConstants.OK, entity, MessageConstants.MESSAGE_SUCCESS_200);
                }
                
            }
            else if (filter == "new") {
                if (keyword != null)
                {
                    if (entity.Count() != 0)
                    {

                        TextInfo ti = CultureInfo.CurrentCulture.TextInfo;



                        List<ProductViewModel> lstTimTheoTenSP = entity.OrderByDescending(p => p.id).Where(n => n.tenSP.Contains(ti.ToTitleCase(keyword))).ToList();
                        List<ProductViewModel> lstTimTheoTenLoai = entity.OrderByDescending(p => p.id).Where(n => n.tenLoai.Contains(ti.ToTitleCase(keyword))).ToList();



                        List<ProductViewModel> lstTimTheoTinhTrang = entity.OrderByDescending(p => p.id).Where(n => n.tinhTrang.Contains(keyword)).ToList();

                        List<ProductViewModel> lstTimTheoMaLoai = entity.OrderByDescending(p => p.id).Where(n => n.maLoai.ToString().Contains(keyword)).ToList();

                        IEnumerable<ProductViewModel> result = new List<ProductViewModel>();
                        result = result.Union(lstTimTheoTenSP);
                        result = result.Union(lstTimTheoTenLoai);


                        result = result.Union(lstTimTheoMaLoai);



                        foreach (ProductViewModel item in result)
                        {
                            Product pro = new Product();
                            pro.id = item.id;
                            pro.maLoai = item.maLoai;
                            pro.tenSP = item.tenSP;
                            pro.image = item.image;
                            pro.giaBan = item.giaBan;
                            pro.sale = item.sale;
                            pro.soLuong = item.soLuong;
                            pro.tinhTrang = item.tinhTrang;


                            products.Add(pro);
                        }
                        return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);

                    }
                    return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);


                }
                return new ResponseEntity(StatusCodeConstants.OK, entity.OrderByDescending(p => p.id), MessageConstants.MESSAGE_SUCCESS_200);


            }
            else if (filter == "nameAsc")
            {
                if (keyword != null)
                {
                    if (entity.Count() != 0)
                    {

                        TextInfo ti = CultureInfo.CurrentCulture.TextInfo;



                        List<ProductViewModel> lstTimTheoTenSP = entity.OrderBy(p => p.tenSP).Where(n => n.tenSP.Contains(ti.ToTitleCase(keyword))).ToList();
                        List<ProductViewModel> lstTimTheoTenLoai = entity.OrderBy(p => p.tenSP).Where(n => n.tenLoai.Contains(ti.ToTitleCase(keyword))).ToList();



                        List<ProductViewModel> lstTimTheoTinhTrang = entity.OrderBy(p => p.tenSP).Where(n => n.tinhTrang.Contains(keyword)).ToList();

                        List<ProductViewModel> lstTimTheoMaLoai = entity.OrderBy(p => p.tenSP).Where(n => n.maLoai.ToString().Contains(keyword)).ToList();

                        IEnumerable<ProductViewModel> result = new List<ProductViewModel>();
                        result = result.Union(lstTimTheoTenSP);
                        result = result.Union(lstTimTheoTenLoai);


                        result = result.Union(lstTimTheoMaLoai);



                        foreach (ProductViewModel item in result)
                        {
                            Product pro = new Product();
                            pro.id = item.id;
                            pro.maLoai = item.maLoai;
                            pro.tenSP = item.tenSP;
                            pro.image = item.image;
                            pro.giaBan = item.giaBan;
                            pro.sale = item.sale;
                            pro.soLuong = item.soLuong;
                            pro.tinhTrang = item.tinhTrang;


                            products.Add(pro);
                        }
                        return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);

                    }
                    return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);


                }
                return new ResponseEntity(StatusCodeConstants.OK, entity.OrderBy(p => p.tenSP), MessageConstants.MESSAGE_SUCCESS_200);


            }
            else if (filter == "nameDesc")
            {
                if (keyword != null)
                {
                    if (entity.Count() != 0)
                    {

                        TextInfo ti = CultureInfo.CurrentCulture.TextInfo;



                        List<ProductViewModel> lstTimTheoTenSP = entity.OrderByDescending(p => p.tenSP).Where(n => n.tenSP.Contains(ti.ToTitleCase(keyword))).ToList();
                        List<ProductViewModel> lstTimTheoTenLoai = entity.OrderByDescending(p => p.tenSP).Where(n => n.tenLoai.Contains(ti.ToTitleCase(keyword))).ToList();



                        List<ProductViewModel> lstTimTheoTinhTrang = entity.OrderByDescending(p => p.tenSP).Where(n => n.tinhTrang.Contains(keyword)).ToList();

                        List<ProductViewModel> lstTimTheoMaLoai = entity.OrderByDescending(p => p.tenSP).Where(n => n.maLoai.ToString().Contains(keyword)).ToList();

                        IEnumerable<ProductViewModel> result = new List<ProductViewModel>();
                        result = result.Union(lstTimTheoTenSP);
                        result = result.Union(lstTimTheoTenLoai);


                        result = result.Union(lstTimTheoMaLoai);



                        foreach (ProductViewModel item in result)
                        {
                            Product pro = new Product();
                            pro.id = item.id;
                            pro.maLoai = item.maLoai;
                            pro.tenSP = item.tenSP;
                            pro.image = item.image;
                            pro.giaBan = item.giaBan;
                            pro.sale = item.sale;
                            pro.soLuong = item.soLuong;
                            pro.tinhTrang = item.tinhTrang;


                            products.Add(pro);
                        }
                        return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);

                    }
                    return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);


                }
                return new ResponseEntity(StatusCodeConstants.OK, entity.OrderByDescending(p => p.tenSP), MessageConstants.MESSAGE_SUCCESS_200);


            }
            else if (filter == "priceDesc")
            {
                if (keyword != null)
                {
                    if (entity.Count() != 0)
                    {

                        TextInfo ti = CultureInfo.CurrentCulture.TextInfo;



                        List<ProductViewModel> lstTimTheoTenSP = entity.OrderByDescending(p => p.sale).Where(n => n.tenSP.Contains(ti.ToTitleCase(keyword))).ToList();
                        List<ProductViewModel> lstTimTheoTenLoai = entity.OrderByDescending(p => p.sale).Where(n => n.tenLoai.Contains(ti.ToTitleCase(keyword))).ToList();



                        List<ProductViewModel> lstTimTheoTinhTrang = entity.OrderByDescending(p => p.sale).Where(n => n.tinhTrang.Contains(keyword)).ToList();

                        List<ProductViewModel> lstTimTheoMaLoai = entity.OrderByDescending(p => p.sale).Where(n => n.maLoai.ToString().Contains(keyword)).ToList();

                        IEnumerable<ProductViewModel> result = new List<ProductViewModel>();
                        result = result.Union(lstTimTheoTenSP);
                        result = result.Union(lstTimTheoTenLoai);


                        result = result.Union(lstTimTheoMaLoai);



                        foreach (ProductViewModel item in result)
                        {
                            Product pro = new Product();
                            pro.id = item.id;
                            pro.maLoai = item.maLoai;
                            pro.tenSP = item.tenSP;
                            pro.image = item.image;
                            pro.giaBan = item.giaBan;
                            pro.sale = item.sale;
                            pro.soLuong = item.soLuong;
                            pro.tinhTrang = item.tinhTrang;


                            products.Add(pro);
                        }
                        return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);

                    }
                    return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);


                }
                return new ResponseEntity(StatusCodeConstants.OK, entity.OrderByDescending(p => p.sale), MessageConstants.MESSAGE_SUCCESS_200);


            }
            else if (filter == "priceAsc")
            {
                if (keyword != null)
                {
                    if (entity.Count() != 0)
                    {

                        TextInfo ti = CultureInfo.CurrentCulture.TextInfo;



                        List<ProductViewModel> lstTimTheoTenSP = entity.OrderBy(p => p.sale).Where(n => n.tenSP.Contains(ti.ToTitleCase(keyword))).ToList();
                        List<ProductViewModel> lstTimTheoTenLoai = entity.OrderBy(p => p.sale).Where(n => n.tenLoai.Contains(ti.ToTitleCase(keyword))).ToList();



                        List<ProductViewModel> lstTimTheoTinhTrang = entity.OrderBy(p => p.sale).Where(n => n.tinhTrang.Contains(keyword)).ToList();

                        List<ProductViewModel> lstTimTheoMaLoai = entity.OrderBy(p => p.sale).Where(n => n.maLoai.ToString().Contains(keyword)).ToList();

                        IEnumerable<ProductViewModel> result = new List<ProductViewModel>();
                        result = result.Union(lstTimTheoTenSP);
                        result = result.Union(lstTimTheoTenLoai);


                        result = result.Union(lstTimTheoMaLoai);



                        foreach (ProductViewModel item in result)
                        {
                            Product pro = new Product();
                            pro.id = item.id;
                            pro.maLoai = item.maLoai;
                            pro.tenSP = item.tenSP;
                            pro.image = item.image;
                            pro.giaBan = item.giaBan;
                            pro.sale = item.sale;
                            pro.soLuong = item.soLuong;
                            pro.tinhTrang = item.tinhTrang;


                            products.Add(pro);
                        }
                        return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);

                    }
                    return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.MESSAGE_SUCCESS_200);


                }
                return new ResponseEntity(StatusCodeConstants.OK, entity.OrderBy(p => p.sale), MessageConstants.MESSAGE_SUCCESS_200);


            }
            return new ResponseEntity(StatusCodeConstants.OK, entity, MessageConstants.MESSAGE_SUCCESS_200);


        }
     
        public IEnumerable<ProductViewModel> getAllProduct1()
        {
            var lstProduct = _productRepository.GetAllAsync().Result;
            var listResult = new List<ProductViewModel>();
            foreach (var n in lstProduct)
            {
                var result = new ProductViewModel { id = n.id, tenSP = n.tenSP, deleted = n.deleted, tenLoai = _categoriesRepository.GetSingleByIdAsync(n.maLoai).Result.tenLoai, maLoai = n.maLoai, giaBan = n.giaBan, sale = n.sale, soLuong = n.soLuong, tinhTrang = n.tinhTrang, image = n.image };
                listResult.Add(result);
            }
            return listResult;
        }
        public async Task<ResponseEntity> getAllProduct()
        {
            var lstProduct = await _productRepository.GetAllAsync();
            var listResult = new List<ProductViewModel>();
            foreach (var n in lstProduct)
            {
                var result = new ProductViewModel { id = n.id, tenSP = n.tenSP, deleted = n.deleted, tenLoai = _categoriesRepository.GetSingleByIdAsync(n.maLoai).Result.tenLoai, maLoai = n.maLoai, giaBan = n.giaBan, sale = n.sale, soLuong = n.soLuong, tinhTrang = n.tinhTrang, image = n.image };
                listResult.Add(result);
            }
            return new ResponseEntity(StatusCodeConstants.OK, listResult, MessageConstants.MESSAGE_SUCCESS_200);
        }
      
        public Customer getUserAsync(int id)
        {
            var userJira = _customerRepository.GetSingleByConditionAsync("id", id).Result;
            return userJira;
        }

        public async Task<ResponseEntity> deleteProduct(int idProduct, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                Product products = await _productRepository.GetSingleByIdAsync(idProduct);

                if (products == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "products is not found", MessageConstants.MESSAGE_ERROR_404);

                }

                await _productRepository.DeleteByIdAsync(new List<dynamic>() { idProduct });
                return new ResponseEntity(StatusCodeConstants.OK, "Deleted product success", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "product is not found", MessageConstants.INSERT_ERROR);
            }
        }
        public async Task<ResponseEntity> getProductById(int idProduct, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                var pro = await _productRepository.GetSingleByConditionAsync("id", idProduct);

                if (pro == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Product is not found", MessageConstants.MESSAGE_ERROR_404);

                }
                 //list prodcut related
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("maLoai", pro.maLoai));
                columns.Add(new KeyValuePair<string, dynamic>("id !", pro.id));

               
                IEnumerable<Product> lstproductsrelated = _productRepository.GetMultiByListConditionAndAsync(columns).Result;
                List<Repository.Models.RelatedProducts> related = new List<Repository.Models.RelatedProducts>();
                foreach (var item in lstproductsrelated)
                {
                    
                    Repository.Models.RelatedProducts mem = new Repository.Models.RelatedProducts();
                    mem.id = item.id;
                    mem.tenSP = item.tenSP;
                    mem.maLoai = item.maLoai;
                    mem.giaBan = item.giaBan;
                    mem.sale = item.sale;
                    mem.soLuong = item.soLuong;
                    mem.tinhTrang = item.tinhTrang;
                    mem.image = item.image;

                    related.Add(mem);
                }

                //list commet
              
                var lstcmt = _commentcustomerRepository.GetMultiByConditionAsync("productId",pro.id).Result;
                List<Repository.Models.CommentProduct> comments = new List<Repository.Models.CommentProduct>();
                foreach (var item in lstcmt)
                {
                    var user = getUserAsync(item.userId);

                    Repository.Models.CommentProduct cmt = new Repository.Models.CommentProduct();
                    cmt.id = item.id;
                    cmt.idUser = item.userId;
                    cmt.name = user.name;
                    cmt.avatar = user.avatar;
                    cmt.commentContent = FuncUtilities.Base64Decode(item.contentComment);
                    cmt.created_at = item.dateCreated.ToString("dd/MM/yyyy HH:mm:ss");
                   

                    comments.Add(cmt);
                }
                Categories category = await _categoriesRepository.GetSingleByConditionAsync("id", pro.maLoai);
                ProductDetail productDetail = new ProductDetail();

                productDetail.tenSP = pro.tenSP;
                productDetail.category = new Categories() { id = category.id, tenLoai = category.tenLoai };
                productDetail.giaBan = pro.giaBan;
                productDetail.id = pro.id;
                productDetail.sale = pro.sale;
                productDetail.soLuong = pro.soLuong;
                productDetail.tinhTrang = pro.tinhTrang;
                productDetail.image = pro.image;

                productDetail.related = related;
                productDetail.lstComment = comments;



                return new ResponseEntity(StatusCodeConstants.OK, productDetail, MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Product is not found", MessageConstants.INSERT_ERROR);
            }
        }
        public async Task<ResponseEntity> getProductByIdCategories(int idCategories, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                var pro = await _productRepository.GetMultiByConditionAsync("maLoai", idCategories);

                if (pro == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Product is not found", MessageConstants.MESSAGE_ERROR_404);

                }
                //list prodcut related
              

                //list commet



                return new ResponseEntity(StatusCodeConstants.OK, pro, MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Product is not found", MessageConstants.INSERT_ERROR);
            }
        }



        public async Task<ResponseEntity> insertProduct(ProductInsert model, string token)
        {
            try
            {
                var DomainImage = "https://localhost:44366/cmnd/";
                var userJira = _userService.getUserByToken(token).Result;
                Product products = new Product();

                products.tenSP = model.tenSP;
                products.maLoai = model.maLoai;
                products.giaBan = model.giaBan;
                products.sale = model.sale;
                products.soLuong = model.soLuong;
                products.image = DomainImage + FuncUtilities.BestLower(model.image.FileName) + "." + model.image.FileName.Split('.')[model.image.FileName.Split('.').Length - 1];
                products.tinhTrang = model.tinhTrang;
                products.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                _fileService.UploadCmndAsync(model.image);



                products = await _productRepository.InsertAsync(products);
                if (products == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);

                return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "Unauthorize", MessageConstants.MESSAGE_ERROR_401);

            }
        }


        public async Task<ResponseEntity> updateProduct(ProductUpdate productUpdate, string token)
        {
            try
            {
                var DomainImage = "https://localhost:44366/cmnd/";
                var userJira = _userService.getUserByToken(token);
                Product products = _productRepository.GetSingleByConditionAsync("id", productUpdate.id).Result;
                if (products == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "product is not found !", MessageConstants.MESSAGE_ERROR_500);
                }


                products.tenSP = productUpdate.tenSP;
                products.maLoai = productUpdate.maLoai;
                products.giaBan = productUpdate.giaBan;
                products.soLuong = productUpdate.soLuong;
                products.image = DomainImage + FuncUtilities.BestLower(productUpdate.image.FileName) + "." + productUpdate.image.FileName.Split('.')[productUpdate.image.FileName.Split('.').Length - 1];
                products.tinhTrang = productUpdate.tinhTrang;


                await _productRepository.UpdateAsync(products.id, products);



                return new ResponseEntity(StatusCodeConstants.OK, products, MessageConstants.UPDATE_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Update fail", MessageConstants.UPDATE_ERROR);

            }



        }
        
    }

}
