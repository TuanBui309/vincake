using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Constants;
using ApiBase.Service.Infrastructure;
using ApiBase.Service.Services.CustomerService;
using ApiBase.Service.Services.ProductManagementService;
using ApiBase.Service.Services.UserService;
using ApiBase.Service.Utilities;
using ApiBase.Service.ViewModels;

using ApiBase.Service.ViewModels.ProjectViewModel;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http.Internal;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;

using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Service.Services.BillService
{

    public interface IBillService : IService<Bills, Bills>
    {
        Task<ResponseEntity> getAllBill();
        Task<ResponseEntity> ThongKe();
        Task<ResponseEntity> ThongKeThuChi1();
        Task<ResponseEntity> getAllProductBill(string token);
        Task<ResponseEntity> getDetailBillByid(int idBills, string token);
        Task<ResponseEntity> deleteBill(int idBills, string token);
       Task<ResponseEntity> deleteAllProductBill( string token);
        Task<ResponseEntity> deleteProductBill(int idProduct, string token);
        Task<ResponseEntity> deleteBillDetail(int idBillDetail, string token);

        Task<ResponseEntity> AddBill(BillModelInsert model, string token);
        Task<ResponseEntity> AddProductBill(ProductBillInsert model, string token);
        Task<ResponseEntity> AddNewProductBill(NewProductBillInsert model, string token);
        Task<ResponseEntity> updateBill(BillModelUpdate model, string token);





    }
    public class BillService : ServiceBase<Bills, Bills>, IBillService
    {
        IBillRepository _billRepository;
        IBillDetailRepository _billDetailRepository;
        IProductRepository _productRepository;
      
        IProductBillRepository _productBillRepository;
        IEditorRepository _editorRepository;
        ISupplierRepository _supplierRepository;
     
        IStatusOrderRepository _statusOrderRepository;
        IThongKeTCRepository _thongKeTCRepository;
        IFileService _fileService;
        IUserJiraRepository _user;
        IUserService _userService;


        public BillService(IBillRepository billRe, ICartRepository cartR, IThongKeTCRepository tcRe, ISupplierRepository supRe, IEditorRepository editRe, IBillDetailRepository bdRe, IProductRepository productR, IUserService userService, IProductBillRepository pbRe, IStatusOrderRepository statusR, IFileService fileSv, IUserJiraRepository userRe,
            IMapper mapper)
            : base(billRe, mapper)
        {
            _thongKeTCRepository = tcRe;
            _billRepository = billRe;
            _supplierRepository = supRe;
            _editorRepository = editRe;
            _productRepository = productR;
            _billDetailRepository = bdRe;
             _statusOrderRepository = statusR;
            _productBillRepository = pbRe;
            _fileService = fileSv;
            _userService = userService;
            _user = userRe;




          
        }
        public async Task<ResponseEntity> ThongKe()
        {
            var result = await _thongKeTCRepository.ThongKe1(2023);
            return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

        }
        public async Task<ResponseEntity> ThongKeThuChi1()
        {
            List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
            
            columns.Add(new KeyValuePair<string, dynamic>("statusId ", 3));
            var result = await _thongKeTCRepository.ThongKeThuChi(columns);
            return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.MESSAGE_SUCCESS_200);

        }
        public async Task<ResponseEntity> getAllBill()
        {
            var lstBills = await _billRepository.GetAllAsync();
            var listResult = new List<BillsViewModel>();
            foreach (var n in lstBills)
            {
                var result = new BillsViewModel { id = n.id, userId = n.userId,created_at=n.dateCreated, supplierId = n.supplierId, total = n.total, userName = _user.GetSingleByConditionAsync("id",n.userId).Result.name, supplierName = _supplierRepository.GetSingleByConditionAsync("id",n.supplierId).Result.name, statusId = n.statusId, statusName = _statusOrderRepository.GetSingleByConditionAsync("id", n.statusId).Result.statusName, lstEditor = getListEditor(n.id).ToList() };
                listResult.Add(result);
            }
            return new ResponseEntity(StatusCodeConstants.OK, listResult, MessageConstants.MESSAGE_SUCCESS_200);
        }
        public UserJira getUserAsync(int id)
        {
            var userJira = _user.GetSingleByConditionAsync("id", id).Result;
            return userJira;
        }
        public StatusOrder getStatusAsync(int id)
        {
            var status = _statusOrderRepository.GetSingleByConditionAsync("id", id).Result;
            return status;
        }
        public IEnumerable<Editors> getListEditor(int billId)
        {
            List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
            columns.Add(new KeyValuePair<string, dynamic>("billId", billId));
            //columns.Add(new KeyValuePair<string, dynamic>("userId", userId));

            IEnumerable<Editors> lstEditpr = _editorRepository.GetMultiByListConditionAndAsync(columns).Result.Select(n =>
            {
                var user = getUserAsync(n.userId);
                var status = getStatusAsync(n.statusId);
                Editors res = new Editors() { id = n.id, userId = n.userId, avatar = user.avatar, userNameEditoer = user.name,updated_at=n.dateCreated,statusNames=status.statusName,statusId=n.statusId,billId=n.billId};
               
                return res;
            });


            return lstEditpr;
        }

      
        public async Task<ResponseEntity> getAllProductBill(string token)
        {
            var userJira = await _userService.getUserByToken(token);
            UserJira user = _userService.getUserByToken(token).Result;
            var lstProduct = await _productBillRepository.GetMultiByConditionAsync("userId",user.id);
          
           
            return new ResponseEntity(StatusCodeConstants.OK, lstProduct, MessageConstants.MESSAGE_SUCCESS_200);
        }
        public async Task<ResponseEntity> getDetailBillByid(int idBills,string token)
        {
            var userJira = await _userService.getUserByToken(token);
            UserJira user = _userService.getUserByToken(token).Result;
            var lstProduct = await _billDetailRepository.GetMultiByConditionAsync("billId", idBills);


            return new ResponseEntity(StatusCodeConstants.OK, lstProduct, MessageConstants.MESSAGE_SUCCESS_200);
        }
        public Product getProductAsync(int id)
        {
            var products = _productRepository.GetSingleByConditionAsync("id", id).Result;
            return products;
        }
        public async Task<ResponseEntity> AddProductBill(ProductBillInsert model, string token)
        {

            try
            {
                var DomainImage = "https://localhost:44366/cmnd/";
                var userJira = await _userService.getUserByToken(token);
                UserJira user = _userService.getUserByToken(token).Result;
                var products = getProductAsync(model.productId);


                ProductBill pb = new ProductBill();
                pb.productId = model.productId;
                pb.name = products.tenSP;
                pb.userId = user.id;
             
                pb.price = model.price;
                pb.quantity = model.quantity;
                pb.image = products.image;
                pb.dateCreated= DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);


                pb = await _productBillRepository.InsertAsync(pb);
                if (pb == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);
                }

                return new ResponseEntity(StatusCodeConstants.OK, pb, MessageConstants.INSERT_SUCCESS);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "", MessageConstants.MESSAGE_ERROR_401);

            }

        }
        public async Task<ResponseEntity> AddNewProductBill(NewProductBillInsert model, string token)
        {

            try
            {

                var DomainImage = "https://localhost:44366/cmnd/";

                var userJira = await _userService.getUserByToken(token);
                UserJira user = _userService.getUserByToken(token).Result;
                Product products = new Product();

                products.tenSP = model.tenSP;
                products.maLoai = model.maLoai;
                products.giaBan = 0;
                products.sale = 0;
                products.soLuong = 0;
                products.image = DomainImage + FuncUtilities.BestLower(model.image.FileName) + "." + model.image.FileName.Split('.')[model.image.FileName.Split('.').Length - 1];
                products.tinhTrang = "null";
                products.dateCreated= DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                _fileService.UploadCmndAsync(model.image);



                products = await _productRepository.InsertAsync(products);
                if (products == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);



                ProductBill pb = new ProductBill();
                pb.productId = products.id;
                pb.name = products.tenSP;
                pb.userId = user.id;

                pb.price = model.price;
                pb.quantity = model.quantity;
                pb.image = products.image;
                pb.dateCreated= DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture); 
                pb.deleted = false;


                pb = await _productBillRepository.InsertAsync(pb);
                if (pb == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);
                }

                return new ResponseEntity(StatusCodeConstants.OK, pb, MessageConstants.INSERT_SUCCESS);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "", MessageConstants.MESSAGE_ERROR_401);

            }

        }
        public async Task<ResponseEntity> AddBill(BillModelInsert model, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                UserJira user = _userService.getUserByToken(token).Result;
               



                Bills bills = new Bills();
                bills.userId = user.id;
                bills.supplierId = model.supplierId;
                bills.statusId = 10;
                bills.total = model.total;
                bills.deleted = false;
                bills.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                bills = await _billRepository.InsertAsync(bills);
                if (bills == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, bills, MessageConstants.INSERT_ERROR);
                var productBills = _productBillRepository.GetMultiByConditionAsync("userId", user.id).Result;
                if (productBills == null)
                { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, productBills, MessageConstants.MESSAGE_ERROR_404); }
                foreach (var item in productBills)
                {
                    var products = getProductAsync(item.productId);
                    if (products == null)
                    { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, products, MessageConstants.MESSAGE_ERROR_404); }



                    BillDetails details = new BillDetails();
                    details.billId = bills.id;
                    details.nameProduct = products.tenSP;
                    details.productId = products.id;

                    details.image = products.image;
                    details.quantity = item.quantity;
                    details.price = item.price*item.quantity;
                    details.deleted = false;
                    details.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                    await _billDetailRepository.InsertAsync(details);
                    if (details == null)
                    {
                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Thêm mới thất bài", MessageConstants.INSERT_ERROR);
                    }
                    else
                    {
                        List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                        columns.Add(new KeyValuePair<string, dynamic>("userId", user.id));



                        await _productBillRepository.DeleteMultiByListConditionAndAsync(columns);
                    }
                }







                return new ResponseEntity(StatusCodeConstants.OK, bills, MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "", MessageConstants.MESSAGE_ERROR_401);

            }
        }

        public async Task<ResponseEntity> deleteAllProductBill( string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                UserJira user = _userService.getUserByToken(token).Result;
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("userId", user.id));



                await _productBillRepository.DeleteMultiByListConditionAndAsync(columns);
               
                return new ResponseEntity(StatusCodeConstants.OK, "Xóa thành công", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Không tìm thấy sản phẩm", MessageConstants.INSERT_ERROR);
            }
        }
        public async Task<ResponseEntity> deleteProductBill(int idPrduct, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                    ProductBill pb = await _productBillRepository.GetSingleByIdAsync(idPrduct);


                if (pb == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy sản phẩm", MessageConstants.MESSAGE_ERROR_404);

                }

                await _productBillRepository.DeleteByIdAsync(new List<dynamic>() { idPrduct });
                return new ResponseEntity(StatusCodeConstants.OK, "Xóa thành công", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Không tìm thấy hóa đơn", MessageConstants.INSERT_ERROR);
            }
        }


        //public async Task<ResponseEntity> get
        public async Task<ResponseEntity> deleteBill (int idBill, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                Bills bills = await _billRepository.GetSingleByIdAsync(idBill);


                if (bills == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy hóa đơn", MessageConstants.MESSAGE_ERROR_404);

                }

                await _billRepository.DeleteByIdAsync(new List<dynamic>() { idBill });
                return new ResponseEntity(StatusCodeConstants.OK, "Xóa thành công", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Không tìm thấy hóa đơn", MessageConstants.INSERT_ERROR);
            }
        }
        public async Task<ResponseEntity> deleteBillDetail(int idBillDetail, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                BillDetails billDetail = await _billDetailRepository.GetSingleByIdAsync(idBillDetail);


                if (billDetail == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy hóa đơn", MessageConstants.MESSAGE_ERROR_404);

                }

                await _billDetailRepository.DeleteByIdAsync(new List<dynamic>() { idBillDetail });
                return new ResponseEntity(StatusCodeConstants.OK, "Xóa thành công", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Không tìm thấy hóa đơn", MessageConstants.INSERT_ERROR);
            }
        }
        public async Task<ResponseEntity> updateBill(BillModelUpdate model, string token)
        {
            try
            {
               
                var userJira = _userService.getUserByToken(token);
                UserJira user = _userService.getUserByToken(token).Result;
                Bills bill = _billRepository.GetSingleByConditionAsync("id", model.id).Result;
                if (bill == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "bills is not found !", MessageConstants.MESSAGE_ERROR_500);
                }

                else
                {
                    if (bill.statusId != 14) {

                        bill.statusId = model.statusId;
                        if (model.statusId == 14)
                        {
                            var detail = _billDetailRepository.GetMultiByConditionAsync("billId", model.id).Result;
                            if (detail == null)
                            { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, detail, MessageConstants.MESSAGE_ERROR_404); }
                            foreach (var item in detail)
                            {
                                var products = getProductAsync(item.productId);
                                if (products == null)
                                { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, products, MessageConstants.MESSAGE_ERROR_404); }
                                products.soLuong += item.quantity;
                                products = await _productRepository.UpdateAsync("id", products.id, products);
                            }

                            await _billRepository.UpdateAsync(bill.id, bill);
                            Editor editors = new Editor();
                            editors.userId = user.id;
                            editors.statusId = bill.statusId;
                            editors.billId = bill.id;
                            editors.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);

                            editors.deleted = false;



                            editors = await _editorRepository.InsertAsync(editors);
                            if (editors == null)
                            {
                                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Thêm mới thất bại", MessageConstants.INSERT_ERROR);
                            }



                            return new ResponseEntity(StatusCodeConstants.OK, bill, MessageConstants.UPDATE_SUCCESS);
                        }
                        else
                        {

                            await _billRepository.UpdateAsync(bill.id, bill);
                            Editor editors = new Editor();
                            editors.userId = user.id;
                            editors.statusId = bill.statusId;
                            editors.billId = bill.id;
                            editors.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);

                            editors.deleted = false;



                            editors = await _editorRepository.InsertAsync(editors);
                            if (editors == null)
                            {
                                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Thêm mới thất bài", MessageConstants.INSERT_ERROR);
                            }



                            return new ResponseEntity(StatusCodeConstants.OK, bill, MessageConstants.UPDATE_SUCCESS);

                        }
                    }
                    else
                    {
                        return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Hóa đơn này đã thanh toán bạn không thể cập nhật", MessageConstants.MESSAGE_ERROR_500);
                    }
                }
                




               
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Update fail", MessageConstants.UPDATE_ERROR);

            }
        }




    }


}
