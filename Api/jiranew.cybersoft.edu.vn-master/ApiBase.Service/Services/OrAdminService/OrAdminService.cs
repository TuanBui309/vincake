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
using System.Net.NetworkInformation;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Service.Services.OrAdminService
{

    public interface IOrAdminService : IService<Orders, Orders>
    {
        Task<ResponseEntity> getAllOrder();
     
       
     
        Task<ResponseEntity> deleteOrder(int idOrder, string token);
        Task<ResponseEntity> HistoryOrder(string token);





        Task<ResponseEntity> updateOrder(OrderModelUpdate model, string token);





    }
    public class OrAdminService : ServiceBase<Orders, Orders>, IOrAdminService
    {
        IOrderRepository _orderRepository;
        IDetailOrderRepository _detailDetailRepository;
        IProductRepository _productRepository;

        IProductBillRepository _productBillRepository;
        IEditorOrderRepository _editorRepository;
        ISupplierRepository _supplierRepository;
        IShippingAddressRepository _shippingAddressRepository;

        IStatusOrderRepository _statusOrderRepository;
        IThongKeTCRepository _thongKeTCRepository;
        IFileService _fileService;
        ICustomerRepository _user;
        IUserJiraRepository _userJira;
        IUserService _userService;
        ICustomerService _customerService;

        public OrAdminService(IOrderRepository orRe, ICustomerService cuSr, ISupplierRepository supRe, IUserJiraRepository uR, IShippingAddressRepository shipRe, IEditorOrderRepository editRe, IDetailOrderRepository doRe, IProductRepository productR, IUserService userService, IProductBillRepository pbRe, IStatusOrderRepository statusR, IFileService fileSv, ICustomerRepository userRe,
            IMapper mapper)
            : base(orRe, mapper)
        {

            _orderRepository = orRe;
            _userJira = uR;
            _supplierRepository = supRe;
            _editorRepository = editRe;
            _productRepository = productR;
            _detailDetailRepository = doRe;
            _statusOrderRepository = statusR;
            _productBillRepository = pbRe;
            _shippingAddressRepository = shipRe;
            _fileService = fileSv;
            _userService = userService;
            _user = userRe;
            _customerService = cuSr;





        }
        public UserJira getUserAsync(int id)
        {
            var userJira = _userJira.GetSingleByConditionAsync("id", id).Result;
            return userJira;
        }
        public StatusOrder getStatusAsync(int id)
        {
            var status = _statusOrderRepository.GetSingleByConditionAsync("id", id).Result;
            return status;
        }
        public IEnumerable<EditorsOrder> getListEditor(int orderId)
        {
            List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
            columns.Add(new KeyValuePair<string, dynamic>("orderId", orderId));
            //columns.Add(new KeyValuePair<string, dynamic>("userId", userId));

            IEnumerable<EditorsOrder> lstEditpr = _editorRepository.GetMultiByListConditionAndAsync(columns).Result.Select(n =>
            {
                var user = getUserAsync(n.userId);
                var status = getStatusAsync(n.statusId);
                EditorsOrder res = new EditorsOrder() { id = n.id, userId = n.userId, avatar = user.avatar, userNameEditoer = user.name, updated_at = n.dateCreated, statusNames = status.statusName, statusId = n.statusId, orderId = n.orderId };

                return res;
            });


            return lstEditpr;
        }

        public async Task<ResponseEntity> getAllOrder()
        {

            var lstOrder = await _orderRepository.GetAllAsync();
            var listResult = new List<OrdersViewModel>();
            foreach (var n in lstOrder)
            {
                var result = new OrdersViewModel { id = n.id, customerId = n.customerId, total = n.total, created_at = n.dateCreated.ToString("dd-MM-yyyy HH:mm:ss"), customers = _user.GetSingleByConditionAsync("id", n.customerId).Result,address1=_shippingAddressRepository.GetSingleByConditionAsync("id",n.addressId).Result, statusId = n.statusId, status1 = _statusOrderRepository.GetSingleByConditionAsync("id", n.statusId).Result, orderDetails = getDetailBillByid(n.id).ToList(),lstEditor = getListEditor(n.id).ToList() };
                listResult.Add(result);
            }
            return new ResponseEntity(StatusCodeConstants.OK, listResult, MessageConstants.MESSAGE_SUCCESS_200);
        }
        public async Task<ResponseEntity> HistoryOrder(string token)
        {
            var userJira = await _customerService.getCustomerByToken(token);
            Customer user = _customerService.getCustomerByToken(token).Result;

            List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
            columns.Add(new KeyValuePair<string, dynamic>("customerId", user.id));
            
            var lstOrder =  _orderRepository.GetMultiByListConditionAndAsync(columns).Result;
            var listResult = new List<OrdersViewModel>();
            foreach (var n in lstOrder)
            {
                var result = new OrdersViewModel { id = n.id, customerId = n.customerId, total = n.total, customers = _user.GetSingleByConditionAsync("id", n.customerId).Result, address1 = _shippingAddressRepository.GetSingleByConditionAsync("id", n.addressId).Result, statusId = n.statusId, status1 = _statusOrderRepository.GetSingleByConditionAsync("id", n.statusId).Result, orderDetails = getDetailBillByid(n.id).ToList(), lstEditor = getListEditor(n.id).ToList(),created_at= n.dateCreated.ToString("dd-MM-yyyy HH:mm:ss") };
                listResult.Add(result);
            }
            return new ResponseEntity(StatusCodeConstants.OK, listResult, MessageConstants.MESSAGE_SUCCESS_200);
        }




        public IEnumerable<DetailOrders> getDetailBillByid(int idOrder)
        {
         
            IEnumerable<DetailOrders> lstdetail = _detailDetailRepository.GetMultiByConditionAsync("orderId", idOrder).Result;


            return lstdetail;
        }
        public Product getProductAsync(int id)
        {
            var products = _productRepository.GetSingleByConditionAsync("id", id).Result;
            return products;
        }
      
      
      

       
       
        //public async Task<ResponseEntity> get
        public async Task<ResponseEntity> deleteOrder(int idOrder, string token)
        {
            try
            {
                var userJira = await _userService.getUserByToken(token);
                Orders od = await _orderRepository.GetSingleByIdAsync(idOrder);


                if (od == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy hóa đơn", MessageConstants.MESSAGE_ERROR_404);

                }

                await _orderRepository.DeleteByIdAsync(new List<dynamic>() { idOrder });
                return new ResponseEntity(StatusCodeConstants.OK, "Xóa thành công", MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Không tìm thấy hóa đơn", MessageConstants.INSERT_ERROR);
            }
        }
       
        public async Task<ResponseEntity> updateOrder(OrderModelUpdate model, string token)
        {
            try
            {

                var userJira = _userService.getUserByToken(token);
                UserJira user = _userService.getUserByToken(token).Result;
                Orders od = _orderRepository.GetSingleByConditionAsync("id", model.id).Result;
                if (od == null)
                {
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "bills is not found !", MessageConstants.MESSAGE_ERROR_500);
                }


                od.statusId = model.statusId;
               




                await _orderRepository.UpdateAsync(od.id, od);
                EditorOrder editors = new EditorOrder();
                editors.userId = user.id;
                editors.statusId = od.statusId;
                editors.orderId = od.id;
                editors.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);

                editors.deleted = false;



                editors = await _editorRepository.InsertAsync(editors);
                if (editors == null)
                {
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Thêm mới thất bài", MessageConstants.INSERT_ERROR);
                }



                return new ResponseEntity(StatusCodeConstants.OK, od, MessageConstants.UPDATE_SUCCESS);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Update fail", MessageConstants.UPDATE_ERROR);

            }
        }




    }


}
