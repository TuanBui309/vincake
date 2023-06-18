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
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Service.Services.OrderService
{

    public interface IOrdersService : IService<Orders, Orders>
    {
        Task<ResponseEntity> getAllorder();
        Task<ResponseEntity> deleteOrder(int idOrder, string token);

        Task<ResponseEntity> AddOrder(OrdersModelInsert model, string token);
        Task<ResponseEntity> HuyDonHang(int idStatus, int idOrder, string token);
        Task<ResponseEntity> DatLai(int idStatus, int idOrder, string token);
        Task<ResponseEntity> history( int idStatus, string token);



    }
    public class OrdersService : ServiceBase<Orders, Orders>, IOrdersService
    {
        IOrderRepository _orderRepository;
        ICartRepository _cartRepository;
        IProductRepository _productRepository;
        IProductManagementService _productService;
        IShippingAddressRepository _shippingAddressRepository;
        IStatusOrderRepository _statusOrderRepository;
        IDetailOrderRepository _detailOrderRepository;
        ICustomerService _customerService;
        ICustomerRepository _customerRepository;
        public OrdersService(IOrderRepository odRe,ICartRepository cartR, IProductRepository productR, ICustomerService customerService, ICustomerRepository customerR, IShippingAddressRepository shipR, IStatusOrderRepository statusR, IDetailOrderRepository detailR,
            IMapper mapper)
            : base(odRe, mapper)
        {
            _orderRepository = odRe;
            _productRepository = productR;
            _shippingAddressRepository = shipR;
            _statusOrderRepository = statusR;
            _detailOrderRepository = detailR;
            _cartRepository = cartR;

            _customerService = customerService;
            _customerRepository = customerR;
        }



        public Task<ResponseEntity> getAllorder()
        {
            throw new NotImplementedException();
        }

        public Product getProductAsync(int id)
        {
            var products = _productRepository.GetSingleByConditionAsync("id", id).Result;
            return products;
        }
        public async Task<ResponseEntity> AddOrder(OrdersModelInsert model, string token)
        {
            try
            {
                var userJira = await _customerService.getCustomerByToken(token);
                Customer user = _customerService.getCustomerByToken(token).Result;
                ShippingAddress shipping = new ShippingAddress();
                shipping.name = model.name;
                shipping.phone = model.phone;
                shipping.address = model.address +","+ model.ward + "," + model.district + "," + model.city ;
                shipping.deleted = false;
                shipping.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                shipping =await _shippingAddressRepository.InsertAsync(shipping);
                if (shipping == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, model, MessageConstants.INSERT_ERROR);
               
                Orders orders = new Orders();
                orders.customerId =user.id;
                orders.addressId = shipping.id;
                orders.statusId =10;
                orders.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                orders.total = model.total;
                orders.deleted = false;
                orders=await _orderRepository.InsertAsync(orders);
                if (orders == null)
                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, orders, MessageConstants.INSERT_ERROR);
                var carts = _cartRepository.GetMultiByConditionAsync("customerId", user.id).Result;
                if (carts == null)
                { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, carts, MessageConstants.MESSAGE_ERROR_404); }
                foreach (var item in carts)
                {
                    var products = getProductAsync(item.productId);
                    if(products==null)
                    { return new ResponseEntity(StatusCodeConstants.NOT_FOUND,products, MessageConstants.MESSAGE_ERROR_404); }



                    DetailOrders details = new DetailOrders();
                    details.orderId = orders.id;
                    details.nameProduct = products.tenSP;
                    details.productId = products.id;

                    details.image = products.image;
                    details.quantity = item.quantity;
                    details.price = item.quantity*products.sale;
                    details.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                    details.deleted = false;
                    await _detailOrderRepository.InsertAsync(details);
                    if (details == null)
                    {
                        return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Thêm mới thất bài", MessageConstants.INSERT_ERROR);
                    }
                    else
                    {
                        List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                        columns.Add(new KeyValuePair<string, dynamic>("customerId", user.id));



                        await _cartRepository.DeleteMultiByListConditionAndAsync(columns);
                    }
                }







                return new ResponseEntity(StatusCodeConstants.OK, shipping.id, MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "", MessageConstants.MESSAGE_ERROR_401);

            }
        }

        public async Task<ResponseEntity> HuyDonHang(int idStatus, int idOrder, string token)
        {
            try
            {
                var userJira = await _customerService.getCustomerByToken(token);
                Customer user = _customerService.getCustomerByToken(token).Result;
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("customerId", user.id));
                columns.Add(new KeyValuePair<string, dynamic>("id", idOrder));
               Orders huy = _orderRepository.GetSingleByConditionAsync("id",idOrder).Result;
                if (huy == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy chi tiết hóa đơn ", MessageConstants.MESSAGE_ERROR_404); 
                }

              
            
                else 
                {
                    if (idStatus != 10)
                    {
                        return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Đơn hàng đang được xử lý,bạn không thể hủy hóa đơn này ", MessageConstants.MESSAGE_ERROR_500);
                    }

                    huy.statusId = 13;

                    huy = await _orderRepository.UpdateAsync(huy.id, huy);
                    var detail = _detailOrderRepository.GetMultiByConditionAsync("orderId", idOrder).Result;
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



                }
              
              







                return new ResponseEntity(StatusCodeConstants.OK, "Hủy Đơn hàng thành công", MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "", MessageConstants.MESSAGE_ERROR_401);

            }
        }
        public async Task<ResponseEntity> DatLai(int idStatus, int idOrder, string token)
        {
            try
            {
                var userJira = await _customerService.getCustomerByToken(token);
                Customer user = _customerService.getCustomerByToken(token).Result;
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("customerId", user.id));
                columns.Add(new KeyValuePair<string, dynamic>("id", idOrder));
                Orders datlai = _orderRepository.GetSingleByConditionAsync("id", idOrder).Result;
                if (datlai == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy  hóa đơn ", MessageConstants.MESSAGE_ERROR_404);
                }



              
                else
                {

                    if (idStatus == 14 || idStatus == 13)
                    {


                        if (idStatus == 13)
                        {
                            var detail = _detailOrderRepository.GetMultiByConditionAsync("orderId", idOrder).Result;
                            if (detail == null)
                            { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, detail, MessageConstants.MESSAGE_ERROR_404); }
                            foreach (var item in detail)
                            {
                                var products = getProductAsync(item.productId);
                                if (products == null)
                                { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, products, MessageConstants.MESSAGE_ERROR_404); }
                                if (products.soLuong < item.quantity)
                                {
                                    return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Số lượng sản phẩm còn lại trong kho không đủ", MessageConstants.INSERT_ERROR);
                                }
                                products.soLuong -= item.quantity;
                                products = await _productRepository.UpdateAsync("id", products.id, products);
                                datlai.statusId = 10;

                                datlai = await _orderRepository.UpdateAsync(datlai.id, datlai);
                            }
                        }
                        else
                        {
                            var getOrderByid = _orderRepository.GetSingleByIdAsync(idOrder).Result;
                            Orders orders = new Orders();
                            orders.customerId = getOrderByid.customerId;
                            orders.addressId = getOrderByid.addressId;
                            orders.statusId = 10;
                            orders.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                            orders.total = getOrderByid.total;
                            orders.deleted = false;
                            orders = await _orderRepository.InsertAsync(orders);
                            if (orders == null)
                                return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, orders, MessageConstants.INSERT_ERROR);
                            var OlddetailOrder = _detailOrderRepository.GetMultiByConditionAsync("orderId", idOrder).Result;
                            if (OlddetailOrder == null)
                            { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, OlddetailOrder, MessageConstants.MESSAGE_ERROR_404); }
                            foreach (var item in OlddetailOrder)
                            {
                                var products = getProductAsync(item.productId);
                                if (products == null)
                                { return new ResponseEntity(StatusCodeConstants.NOT_FOUND, products, MessageConstants.MESSAGE_ERROR_404); }



                                DetailOrders details = new DetailOrders();
                                details.orderId = orders.id;
                                details.nameProduct = products.tenSP;
                                details.productId = products.id;

                                details.image = products.image;
                                details.quantity = item.quantity;
                                details.price = item.quantity * products.sale;
                                details.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                                details.deleted = false;
                                await _detailOrderRepository.InsertAsync(details);

                            }

                        }
                    }

                    else
                    {
                        return new ResponseEntity(StatusCodeConstants.ERROR_SERVER, "Đơn hàng đang được xử lý,bạn không thể đặt lại đơn hàng này ", MessageConstants.MESSAGE_ERROR_500);
                    }


                }









                return new ResponseEntity(StatusCodeConstants.OK, "Đặt hàng thành công", MessageConstants.INSERT_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.AUTHORIZATION, "", MessageConstants.MESSAGE_ERROR_401);

            }
        }

        //public async Task<ResponseEntity> get
        public async Task<ResponseEntity> deleteOrder(int idOrder, string token)
        {
            try
            {
                var userJira = await _customerService.getCustomerByToken(token);
                Orders orders = await _orderRepository.GetSingleByIdAsync(idOrder);


                if (orders == null)
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
        public async Task<ResponseEntity> history(int idStatus, string token)

        {
            try
            {

                var userJira = await _customerService.getCustomerByToken(token);
                Customer user = _customerService.getCustomerByToken(token).Result;
                List<KeyValuePair<string, dynamic>> columns = new List<KeyValuePair<string, dynamic>>();
                columns.Add(new KeyValuePair<string, dynamic>("customerId", user.id));
                columns.Add(new KeyValuePair<string, dynamic>("statusId ", idStatus));
                IEnumerable<Orders> orders = _orderRepository.GetMultiByListConditionAndAsync(columns).Result;
                var listResult = new List<HistoryViewModel>();

                if (orders == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy đơn hàng có id này", MessageConstants.MESSAGE_ERROR_404);

                }
               foreach(var item in orders)
                {
                    IEnumerable<ShippingAddress> lstaddress1 = await _shippingAddressRepository.GetMultiByConditionAsync("id", item.addressId);

                    if (lstaddress1 == null)
                    {
                        return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không địa chỉ đơn hàng", MessageConstants.MESSAGE_ERROR_404);

                    }

                    List<Repository.Models.lstAddress> addresses = new List<Repository.Models.lstAddress>();
                    foreach (var item1 in lstaddress1)
                    {

                        Repository.Models.lstAddress mem = new Repository.Models.lstAddress();
                        mem.id = item1.id;
                        mem.name = item1.name;
                        mem.phone = item1.phone;
                        mem.address = item1.address;


                        addresses.Add(mem);
                    }

                   

                    var lstDetail = _detailOrderRepository.GetMultiByConditionAsync("orderId", item.id).Result;
                    if(lstDetail==null)
                    {
                        return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "Không tìm thấy hóa đơn", MessageConstants.MESSAGE_ERROR_404);

                    }
                    List<Repository.Models.lstDetailOrder> detailOrders = new List<Repository.Models.lstDetailOrder>();
                    foreach (var item2 in lstDetail)
                    {


                        Repository.Models.lstDetailOrder cmt = new Repository.Models.lstDetailOrder();
                        cmt.id = item2.id;
                        cmt.productId = item2.productId;
                        cmt.image = item2.image;
                        cmt.quantity = item2.quantity;
                        cmt.price = item2.price;



                        detailOrders.Add(cmt);
                    }

                    HistoryViewModel his = new HistoryViewModel();

                    his.id = item.id;

                    his.customerId = item.customerId;
                    his.addressId = item.addressId;
                    his.statusId = item.statusId;


                    his.lstAddress = addresses;
                    his.lstDetail = detailOrders;
                    listResult.Add(his);
                   


                }
                return new ResponseEntity(StatusCodeConstants.OK, listResult, MessageConstants.MESSAGE_SUCCESS_200);






            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Product is not found", MessageConstants.INSERT_ERROR);
            }
        }

    }


}
