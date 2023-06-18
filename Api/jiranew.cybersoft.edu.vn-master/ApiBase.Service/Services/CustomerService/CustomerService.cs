using ApiBase.Repository.Models;
using ApiBase.Repository.Repository;
using ApiBase.Service.Constants;
using ApiBase.Service.Helpers;
using ApiBase.Service.Infrastructure;
using ApiBase.Service.Utilities;
using ApiBase.Service.ViewModels;

using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Net.Http;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using ApiBase.Service.Services.PriorityService;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ApiBase.Service.Services.CustomerService
{

    public interface ICustomerService : IService<Customer, CustomerModel>
    {
       
        
        Task<ResponseEntity> SignInFacebookAsync(DangNhapFacebookViewModel modelVm);
        Task<ResponseEntity> getCustomerById(int idCustomer);
        Task<Customer> getCustomerByToken(string token);
        Task<ResponseEntity> RegisterCustomer(CustomerModel modelVm);
        Task<ResponseEntity> editCustomer(CustomerModelUpdate modelVm);
        Task<ResponseEntity> SignIn(CustomerLogin modelVm);
        Task<ResponseEntity> ForgetPassword(CustomerModelForgerPassword modelVm);
        Task<ResponseEntity> getCustomer(string keyword = "");
        Task<ResponseEntity> deleteCustomer(int id);
        Task<ResponseEntity> ResetPassword(ResetPasswordModel modelVm);

    }
    public class CustomerService : ServiceBase<Customer, CustomerModel>, ICustomerService
    {
        ICustomerRepository _customerRepository;

        IMailService _mailService;
        
        IProjectRepository _projectRepository;
       
        ICommentRepository _commentRepository;


        private readonly IAppSettings _appSettings;

        public CustomerService(IProjectRepository projectRepository, ICustomerRepository CustomerRepos, IMailService MailSV, IAppSettings appSettings, ICommentRepository commentRepository,
            IMapper mapper)
            : base(CustomerRepos, mapper)
        {
            _customerRepository = CustomerRepos;
            _mailService = MailSV;
           
          
            _appSettings = appSettings;
         
            _projectRepository = projectRepository;
          
            _commentRepository = commentRepository;
        }

      

     

        //private async Task<string> GenerateToken(Customer entity)
        //{
        //    try
        //    {
        //        CustomerType group = await _CustomerTypeRepository.GetSingleByIdAsync("Customers");
        //        if (group == null)
        //            return string.Empty;

        //        IEnumerable<CustomerType_Role> group_Role = await _CustomerType_RoleRepository.GetMultiByConditionAsync("CustomerTypeId", group.id);

        //        List<string> lstDanhSachQuyen = new List<string>();
        //        foreach (var item in group_Role)
        //        {
        //            lstDanhSachQuyen.Add(item.roleId);
        //        }

        //        string danhSachQuyen = JsonConvert.SerializeObject(lstDanhSachQuyen);
        //        List<string> roles = JsonConvert.DeserializeObject<List<string>>(danhSachQuyen);

        //        List<Claim> claims = new List<Claim>();
        //        //claims.Add(new Claim(ClaimTypes.Name, entity.Id));
        //        claims.Add(new Claim(ClaimTypes.Email, entity.email));
        //        if (roles != null)
        //        {
        //            foreach (var item in roles)
        //            {
        //                claims.Add(new Claim(ClaimTypes.Role, item.Trim()));
        //            }
        //        }
        //        var secret = Encoding.ASCII.GetBytes(_appSettings.Secret);
        //        var token = new JwtSecurityToken(
        //                claims: claims,
        //                notBefore: new DateTimeOffset(DateTime.Now).DateTime,
        //                expires: new DateTimeOffset(DateTime.Now.AddMinutes(60)).DateTime,
        //                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature)
        //            );
        //        return new JwtSecurityTokenHandler().WriteToken(token);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        public async Task<ResponseEntity> SignInFacebookAsync(DangNhapFacebookViewModel modelVm)
        {


            string[] ERR_MESSAGE = { "Vui lòng nhập email bạn đã đăng ký!", "Email này đã được sử dụng cho tài khoản facebook khác!", "Email không chính xác!" };
            string[] ERR_STATUS = { "EMAIL_ENTER", "EMAIL_EXISTS", "EMAIL_INCORRECT" };

            try
            {

                var httpClient = new HttpClient { BaseAddress = new Uri("https://graph.facebook.com/v2.9/") };
                var response = await httpClient.GetAsync($"me?access_token={modelVm.facebookToken}&fields=id,name,email,first_name,last_name,age_range,birthday,gender,locale");
                if (!response.IsSuccessStatusCode)
                {
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Login facebook failure !", "Please, try login again");
                }
                var result = await response.Content.ReadAsStringAsync();
                dynamic facebookAccount = JsonConvert.DeserializeObject<FacebookResult>(result);

                //Checkfacebook id
                Customer facebookCustomer = await _customerRepository.GetSingleByConditionAsync("facebookId", facebookAccount.id);
                if (facebookCustomer != null)
                {
                    CustomerLoginResult CustomerResult = new CustomerLoginResult();
                    CustomerResult.email = facebookCustomer.email;
                    CustomerResult.accessToken = await GenerateTokenJira(facebookCustomer);
                    return new ResponseEntity(StatusCodeConstants.OK, CustomerResult, MessageConstants.SIGNIN_SUCCESS);

                }
                //Đăng nhập thành công fb kiểm tra có email không nếu có cho dn thành công
                Type objType = facebookAccount.GetType();
                if (objType.GetProperty("email") != null)
                {
                    //Kiểm tra có email chưa lấy ra
                    Customer CustomerCheckEmail = await _customerRepository.GetSingleByConditionAsync("email", facebookAccount.email);
                    if (CustomerCheckEmail != null)
                    {
                        //Cập nhật fb id cho mail đó
                        CustomerCheckEmail.facebookId = facebookAccount.id;
                        await _customerRepository.UpdateByConditionAsync("email", facebookAccount.email, CustomerCheckEmail);
                        CustomerLoginResult CustomerResult = new CustomerLoginResult();
                        CustomerResult.email = CustomerCheckEmail.email;
                        CustomerResult.accessToken = await GenerateTokenJira(facebookCustomer);
                        return new ResponseEntity(StatusCodeConstants.OK, CustomerResult, MessageConstants.SIGNIN_SUCCESS);
                    }
                }
                //Nếu chưa có tạo tài khoản
                Customer CustomerModel = new Customer();
                CustomerModel.facebookId = facebookAccount.id;
                CustomerModel.name = facebookAccount.first_name + " " + facebookAccount.last_name;
                CustomerModel.email = CustomerModel.facebookId + "@facebook.com";
                CustomerModel.deleted = false;
                CustomerModel.avatar = "/static/Customer-icon.png";
                //CustomerModel.CustomerTypeId = "CUSTOMER";

                Customer CustomerInsert = await _customerRepository.InsertAsync(CustomerModel);
                if (CustomerInsert != null)
                {
                    CustomerLoginResult CustomerResult = new CustomerLoginResult();
                    CustomerResult.email = CustomerModel.email;
                    CustomerResult.accessToken = await GenerateTokenJira(CustomerModel);
                    return new ResponseEntity(StatusCodeConstants.OK, CustomerResult, MessageConstants.SIGNIN_SUCCESS);
                }

                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, ERR_STATUS[0], ERR_MESSAGE[0]);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, ERR_STATUS[0], ERR_MESSAGE[0]);
            }
            //register if required
            //var facebookCustomer = _context.FacebookCustomers.SingleOrDefault(x => x.Id == facebookAccount.Id);
            //if (facebookCustomer == null)
            //{
            //    var Customer = new ApplicationCustomer { CustomerName = facebookAccount.Name, Email = facebookAccount.Email };
            //    var result2 = await _CustomerManager.CreateAsync(Customer);
            //    if (!result2.Succeeded) return BadRequest();
            //    facebookCustomer = new FacebookCustomer { Id = facebookAccount.Id, CustomerId = Customer.Id };
            //    _context.FacebookCustomers.Add(facebookCustomer);
            //    _context.SaveChanges();
            //}


            //    }
            //    return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.SIGNIN_SUCCESS);
            //}
            //catch (Exception ex)
            //{
            //    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, ex.Message, MessageConstants.SIGNIN_ERROR);
            //}
            //string[] ERR_MESSAGE = { "Vui lòng nhập email bạn đã đăng ký!", "Email này đã được sử dụng cho tài khoản facebook khác!", "Email không chính xác!" };
            //string[] ERR_STATUS = { "EMAIL_ENTER", "EMAIL_EXISTS", "EMAIL_INCORRECT" };

            //try
            //{
            //    CustomerLoginResult result = new CustomerLoginResult();

            //    AppCustomer entity = await _CustomerRepository.GetByFacebookAsync(modelVm.FacebookId);
            //    if (entity != null) // Nếu FacebookId đúng => đăng nhập thành công
            //    {
            //        // Tạo token
            //        result.accessToken = await GenerateToken(entity);
            //        result.email = entity.email;
            //        return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.SIGNIN_SUCCESS);
            //    }

            //    //// Nếu facebook id sai và email chưa nhập
            //    //if (string.IsNullOrEmpty(modelVm.Email))
            //    //    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, ERR_STATUS[0], ERR_MESSAGE[0]);


            //    if (entity == null)
            //    {
            //        var httpClient = new HttpClient { BaseAddress = new Uri("https://graph.facebook.com/v2.9/") };
            //        var response = await httpClient.GetAsync($"me?access_token={facebookToken.Token}&fields=id,name,email,first_name,last_name,age_range,birthday,gender,locale,picture");
            //        if (!response.IsSuccessStatusCode) return BadRequest();
            //        var result = await response.Content.ReadAsStringAsync();
            //        var facebookAccount = JsonConvert.DeserializeObject<FacebookAccount>(result);

            //        //register if required
            //        var facebookCustomer = _context.FacebookCustomers.SingleOrDefault(x => x.Id == facebookAccount.Id);
            //        if (facebookCustomer == null)
            //        {
            //            var Customer = new ApplicationCustomer { CustomerName = facebookAccount.Name, Email = facebookAccount.Email };
            //            var result2 = await _CustomerManager.CreateAsync(Customer);
            //            if (!result2.Succeeded) return BadRequest();
            //            facebookCustomer = new FacebookCustomer { Id = facebookAccount.Id, CustomerId = Customer.Id };
            //            _context.FacebookCustomers.Add(facebookCustomer);
            //            _context.SaveChanges();
            //        }


            //    }
            //    return new ResponseEntity(StatusCodeConstants.OK, result, MessageConstants.SIGNIN_SUCCESS);
            //}
            //catch (Exception ex)
            //{
            //    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, ex.Message, MessageConstants.SIGNIN_ERROR);
            //}
        }

        public async Task<Customer> getCustomerByToken(string tokenString)
        {
            try
            {
                string email = FuncUtilities.parseJWTToEmail(tokenString);
                Customer us = await _customerRepository.GetSingleByConditionAsync("email", email);
                return us;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<ResponseEntity> getCustomerById(int idCustomer)
        {
            try
            {
                
                Customer cus = await _customerRepository.GetSingleByIdAsync(idCustomer);

                if (cus == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, "customer is not found", MessageConstants.MESSAGE_ERROR_404);

                }
                

                Member mem = new Member();

                mem.userId = cus.id;
                mem.name = cus.name;
                mem.avatar = cus.avatar;
                mem.phoneNumber = cus.phoneNumber;
                mem.email = cus.email;


                return new ResponseEntity(StatusCodeConstants.OK, mem, MessageConstants.MESSAGE_SUCCESS_200);

            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "customer is not found", MessageConstants.INSERT_ERROR);
            }
        }

        public async Task<ResponseEntity> RegisterCustomer(CustomerModel modelVm)
        {
            try
            {
                Customer entity = await _customerRepository.GetSingleByConditionAsync("email", modelVm.email);
                if (entity != null) // Kiểm tra email đã được sử dụng bởi tài khoản khác chưa
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.EMAIL_EXITST);

                entity = _mapper.Map<Customer>(modelVm);
                entity.avatar = "https://ui-avatars.com/api/?name=" + entity.name;
                entity.alias = FuncUtilities.BestLower(modelVm.name);
                entity.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                entity.verificationToken = "";
                entity.verifiedAt = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);

                entity.deleted = false;
                //entity.gender = ;
                //entity.Id = Guid.NewGuid().ToString();
                // Mã hóa mật khẩu
                //entity.MatKhau = BCrypt.Net.BCrypt.HashPassword(modelVm.MatKhau);
                //entity.avatar = "/static/user-icon.png";
                entity = await _customerRepository.InsertAsync(entity);


                if (entity == null)
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.SIGNUP_ERROR);

                return new ResponseEntity(StatusCodeConstants.OK, modelVm, MessageConstants.SIGNUP_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.SIGNUP_ERROR);
            }
        }

        private async Task<string> GenerateTokenJira(Customer entity)
        {
            try
            {
                //CustomerType group = await _CustomerTypeRepository.GetSingleByIdAsync(entity.CustomerTypeId);
                //if (group == null)
                //    return string.Empty;

                //IEnumerable<CustomerType_Role> group_Role = await _CustomerType_RoleRepository.GetMultiByConditionAsync("CustomerTypeId", group.id);

                //List<string> lstDanhSachQuyen = new List<string>();
                //foreach (var item in group_Role)
                //{
                //    lstDanhSachQuyen.Add(item.roleId);
                //}

                //string danhSachQuyen = JsonConvert.SerializeObject(lstDanhSachQuyen);
                //List<string> roles = JsonConvert.DeserializeObject<List<string>>(danhSachQuyen);

                List<Claim> claims = new List<Claim>();
                //claims.Add(new Claim(ClaimTypes.Name, entity.Id));
                claims.Add(new Claim(ClaimTypes.Email, entity.email));
                //if (roles != null)
                //{
                //    foreach (var item in roles)
                //    {
                //        claims.Add(new Claim(ClaimTypes.Role, item.Trim()));
                //    }
                //}
                var secret = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var token = new JwtSecurityToken(
                        claims: claims,
                        notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                        expires: new DateTimeOffset(DateTime.Now.AddMinutes(60)).DateTime,
                        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature)
                    );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ResponseEntity> SignIn(CustomerLogin modelVm)
        {
            Customer entity = await _customerRepository.GetSingleByConditionAsync("email", modelVm.email);
            if (entity == null) // Kiểm tra email đã được sử dụng bởi tài khoản khác chưa
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, "Email", MessageConstants.EMAIL_DO_NOT_EXITST);

            if (entity.passWord != modelVm.passWord)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, "Tài khoản hoặc mật khẩu không đúng !");
            }
            CustomerModelView usModel = new CustomerModelView();
            usModel.id = entity.id;
            usModel.name = entity.name;
            usModel.avatar = entity.avatar;
            usModel.email = entity.email;
            usModel.phoneNumber = entity.phoneNumber;
            usModel.accessToken = await GenerateTokenJira(entity);
            return new ResponseEntity(StatusCodeConstants.OK, usModel, MessageConstants.MESSAGE_SUCCESS_200);
        }

        public async Task<ResponseEntity> getCustomer(string keyword = "")
        {
            IEnumerable<Customer> entity = _customerRepository.GetAllAsync().Result;
            List<Member> members = new List<Member>();

            if (entity.Count() != 0)
            {
                keyword = FuncUtilities.BestLower(keyword);
                List<Customer> lstTimTheoTen = entity.Where(n => n.alias.Contains(keyword)).ToList();

                List<Customer> lstTimTheoSdt = entity.Where(n => n.phoneNumber.Contains(keyword)).ToList();

                List<Customer> lstTimTheoEmail = entity.Where(n => n.email.Contains(keyword)).ToList();

                List<Customer> lstTimTheoMa = entity.Where(n => n.id.ToString().Contains(keyword)).ToList();

                IEnumerable<Customer> result = new List<Customer>();
                result = result.Union(lstTimTheoTen);
                result = result.Union(lstTimTheoSdt);
                result = result.Union(lstTimTheoEmail);
                result = result.Union(lstTimTheoMa);



                foreach (Customer item in result)
                {
                    Member mem = new Member();

                    mem.userId = item.id;
                    mem.name = item.name;
                    mem.avatar = item.avatar;
                    mem.phoneNumber = item.phoneNumber;
                    mem.email = item.email;

                    members.Add(mem);
                }
                return new ResponseEntity(StatusCodeConstants.OK, members, MessageConstants.MESSAGE_SUCCESS_200);

            }
            return new ResponseEntity(StatusCodeConstants.OK, members, MessageConstants.MESSAGE_SUCCESS_200);

        }

       

        public async Task<ResponseEntity> editCustomer(CustomerModelUpdate modelVm)
        {
            var CustomerEdit = _customerRepository.GetSingleByConditionAsync("id", modelVm.id).Result;

            try
            {
                if (CustomerEdit == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, MessageConstants.DELETE_ERROR, MessageConstants.MESSAGE_ERROR_404);

                }

                CustomerEdit.name = modelVm.name;
                CustomerEdit.email = modelVm.email;
                if (modelVm.passWord == "")
                {

                    CustomerEdit.passWord = CustomerEdit.passWord;
                  
                }
                else
                {
                    CustomerEdit.passWord = modelVm.passWord;
                }
                    
                
              
                CustomerEdit.phoneNumber = modelVm.phoneNumber;
                CustomerEdit.avatar = "https://ui-avatars.com/api/?name=" + CustomerEdit.name;
                await _customerRepository.UpdateAsync(modelVm.id, CustomerEdit);


                return new ResponseEntity(StatusCodeConstants.OK, CustomerEdit, MessageConstants.MESSAGE_SUCCESS_200);
            }
            catch (Exception err)
            {
                return new ResponseEntity(StatusCodeConstants.OK, MessageConstants.UPDATE_ERROR, MessageConstants.MESSAGE_ERROR_400);

            }


        }
       


        public async Task<ResponseEntity> deleteCustomer(int id)
        {
            try
            {
                var CustomerEdit = _customerRepository.GetSingleByConditionAsync("id", id).Result;
                if (CustomerEdit == null)
                {
                    return new ResponseEntity(StatusCodeConstants.NOT_FOUND, MessageConstants.DELETE_ERROR, MessageConstants.MESSAGE_ERROR_404);

                }
                List<dynamic> lstResult2 = new List<dynamic>();
                //var lstComment = _taskUserRepository.GetMultiByListConditionAndAsync(columns).Result;

                //foreach (var item in lstComment)
                //{
                //    lstResult2.Add(item.id);
                //}
                //await _commentRepository.DeleteByIdAsync(lstResult2);


                List<dynamic> lstId = new List<dynamic>();
                lstId.Add(id);





                await _customerRepository.DeleteByIdAsync(lstId);

                return new ResponseEntity(StatusCodeConstants.OK, MessageConstants.DELETE_SUCCESS, MessageConstants.MESSAGE_SUCCESS_200);
            }
            catch (Exception err)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, MessageConstants.DELETE_ERROR, MessageConstants.MESSAGE_ERROR_400);

            }

        }
        private  string GenerateRandomString()
        {
            // Check if the length is positive
          

            // Create a byte array to store the random bytes
            byte[] bytes = new byte[50];

            // Create a random number generator
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                // Fill the byte array with random values
                rng.GetBytes(bytes);
            }

            // Convert the byte array to a hex string
            string hexString = Convert.ToBase64String(bytes);

            // Return the hex string
            return hexString;
        }
        public async Task<ResponseEntity> ForgetPassword(CustomerModelForgerPassword modelVm)
        {
            try
            {
                var entity = await _customerRepository.GetSingleByConditionAsync("email", modelVm.email);
                if (entity == null) // Kiểm tra email đã được sử dụng bởi tài khoản khác chưa
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.EMAIL_DO_NOT_EXITST);

               
                entity.verificationToken = GenerateRandomString();
                entity.verifiedAt = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                await _mailService.SendMailAsync(entity.name, entity.email, entity.verificationToken);


                
                //entity.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);

             
                //entity.gender = ;
                //entity.Id = Guid.NewGuid().ToString();
                // Mã hóa mật khẩu
                //entity.MatKhau = BCrypt.Net.BCrypt.HashPassword(modelVm.MatKhau);
                //entity.avatar = "/static/user-icon.png";
                entity = await _customerRepository.UpdateAsync(entity.id,entity);


                if (entity == null)
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.SIGNUP_ERROR);

                return new ResponseEntity(StatusCodeConstants.OK, modelVm, "Kiểm tra email của bạn để lấy mã xác nhận");
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.MESSAGE_ERROR_500);
            }
        }
        public async Task<ResponseEntity> ResetPassword(ResetPasswordModel modelVm)
        {
            try
            {
                var entity = await _customerRepository.GetSingleByConditionAsync("verificationToken", modelVm.verificationToken);
             
                if (entity == null || entity.verifiedAt.Day< DateTime.Now.Day) // Kiểm tra email đã được sử dụng bởi tài khoản khác chưa
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, entity.verifiedAt.Day, MessageConstants.VERIFI_DO_NOT_EXITST);


                entity.passWord = modelVm.passWord;
                



                //entity.dateCreated = DateTime.ParseExact(DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"), "dd/MM/yyyy hh:mm:ss", System.Globalization.CultureInfo.InvariantCulture);


                //entity.gender = ;
                //entity.Id = Guid.NewGuid().ToString();
                // Mã hóa mật khẩu
                //entity.MatKhau = BCrypt.Net.BCrypt.HashPassword(modelVm.MatKhau);
                //entity.avatar = "/static/user-icon.png";
                entity = await _customerRepository.UpdateAsync(entity.id, entity);


                if (entity == null)
                    return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.VERIFI_DO_NOT_EXITST);

                return new ResponseEntity(StatusCodeConstants.OK, modelVm, MessageConstants.RESET_SUCCESS);
            }
            catch (Exception ex)
            {
                return new ResponseEntity(StatusCodeConstants.BAD_REQUEST, modelVm, MessageConstants.VERIFI_DO_NOT_EXITST);
            }
        }

    }
}
