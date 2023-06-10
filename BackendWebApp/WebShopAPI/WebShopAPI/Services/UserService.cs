﻿using AutoMapper;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using WebShopAPI.Dto;
using WebShopAPI.Infrastructure;
using WebShopAPI.Interfaces;
using WebShopAPI.Models;

namespace WebShopAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey, _senderEmail;
        private readonly WebShopDbContext _dbContext;
        private readonly SmtpClient _smtpClient;


        public UserService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext, SmtpClient smtpClient)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
            _senderEmail = config.GetSection("Smtp:Username");
            _smtpClient = smtpClient;
        }

        public Dictionary<string, string> Login(UserCredentialsDto credentialsDto)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";
            UserCredentialsDto user = _mapper.Map<List<UserCredentialsDto>>(_dbContext.Users.ToList()).First(x => x.Email == credentialsDto.Email);
            UserDto userDto = GetById(user.UserId);

            if(user == null)
            {
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;
            }
            
            if (BCrypt.Net.BCrypt.Verify(credentialsDto.Password, user.Password))
            {

                
                List<Claim> claims = new List<Claim>();
                if (user.UserType == "admin")
                    claims.Add(new Claim(ClaimTypes.Role, "admin"));
                if (user.UserType == "seller")
                    claims.Add(new Claim(ClaimTypes.Role, "seller"));
                if (user.UserType == "buyer")
                    claims.Add(new Claim(ClaimTypes.Role, "buyer"));

                claims.Add(new Claim("userId", user.UserId.ToString()));
                claims.Add(new Claim("verification", userDto.Verification.ToString()));
                claims.Add(new Claim("userType", user.UserType.ToString()));

                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:44398", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddMinutes(60), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                if(response["statusCode"] == "200")
                {
                    response["token"] = tokenString;
                }

                return response;
            }
            else
            {
                response["statusCode"] = "401";
                response["message"] = "Credentials do not match.";
                return response;
            }
        }

        public async Task<Dictionary<string, string>> Register(UserDto userDto) {

            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";
            User user = _mapper.Map<User>(userDto);

            List<UserDto> registeredUsers = GetUsers();
            if (user == null)
            {
                Console.WriteLine("-------------NEUSPESNO MAPIRANJE--------------");
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;
            }
            Console.WriteLine(user.UserName);
            #region UsernameValidation
            if (user.UserName == string.Empty || user.UserName == null)
            {
                Console.WriteLine("------------PRAZNO IME---------------");
                response["statusCode"] = "400";
                response["message"] = "\nUsername must not be empty.";
            }
            else if(user.UserName.Length < 3 || user.UserName.Length > 20)
            {
                Console.WriteLine("------------PREKRATKO/PREDUGACKO IME---------------");
                response["statusCode"] = "400";
                response["message"] = "\nUsername length has to be between 3 and 20 characters.";
            }

            
            foreach (UserDto usr in registeredUsers)
            {
                if(user.UserName.ToLower() == usr.UserName)
                {
                    Console.WriteLine("--------------VEC POSTOJI USERNAME-------------");
                    response["statusCode"] = "400";
                    response["message"] += "\nUsername already taken.";
                }
            }

            #endregion UsernameValidation

            #region EmailValidation
            if(user.Email == string.Empty || user.Email == null)
            {
                response["statusCode"] = "400";
                response["message"] += "\nEmail must not be empty.";
            }
            else if (!user.Email.Contains('@'))
            {
                response["statusCode"] = "400";
                response["message"] += "\nInvalid email format.";
            }
            else if(user.Email.Length < 6 || user.Email.Length > 30)
            {
                response["statusCode"] = "400";
                response["message"] += "\nEmail length has to be between 6 and 30 characters";
            }

            foreach (UserDto usr in registeredUsers)
            {
                if (user.Email == usr.Email)
                {
                    Console.WriteLine("--------------VEC POSTOJI EMAIL-------------");
                    response["statusCode"] = "400";
                    response["message"] += "\nThis email has already been registered";
                }
            }


            #endregion EmailValidation

            #region FirstnameValidation
            if (user.FirstName == string.Empty || user.FirstName == null)
            {
                response["statusCode"] = "400";
                response["message"] += "\nFirstname must not be empty.";
            }
            else if(!Regex.IsMatch(user.FirstName, @"^[a-zA-Z]+$"))
            {
                response["statusCode"] = "400";
                response["message"] += "\nFirstname can not contain numbers.";
            }
            else if(user.FirstName.Length < 2 || user.FirstName.Length > 30)
            {
                response["statusCode"] = "400";
                response["message"] += "\nFirstname length has to be between 2 and 30 characters";
            }
            #endregion FirstnameValidation

            #region LastnameValidation
            if (user.LastName == string.Empty || user.LastName == null)
            {
                response["statusCode"] = "400";
                response["message"] += "\nLastname must not be empty.";
            }
            else if (!Regex.IsMatch(user.LastName, @"^[a-zA-Z]+$"))
            {
                response["statusCode"] = "400";
                response["message"] += "\nLastname can not contain numbers.";
            }
            else if (user.LastName.Length < 2 || user.LastName.Length > 30)
            {
                response["statusCode"] = "400";
                response["message"] += "\nLastname length has to be between 2 and 30 characters";
            }
            #endregion LastnameValidation

            #region AddressValidation
            if (user.Address == string.Empty || user.Address == null)
            {
                response["statusCode"] = "400";
                response["message"] += "\nAddress must not be empty.";
            }
            else if (Regex.IsMatch(user.Address, @"^[0-9]+$"))
            {
                response["statusCode"] = "400";
                response["message"] += "\nAddress can not contain only numbers.";
            }
            else if (user.Address.Length < 5 || user.Address.Length > 50)
            {
                response["statusCode"] = "400";
                response["message"] += "\nAddress length has to be between 5 and 50 characters";
            }

            #endregion AddressValidation

            #region PasswordValidation
            if (user.Password == string.Empty || user.Password == null)
            {
                response["statusCode"] = "400";
                response["message"] += "\nPassword must not be empty.";
            }
            else if(user.Password.Length < 6 || user.Password.Length > 30)
            {
                response["statusCode"] = "400";
                response["message"] += "\nPassword length has to be between 6 and 30 characters";
            }
            #endregion PasswordValidation

            #region BirthDateValidation

            if(DateTime.Compare(user.DateOfBirth, new DateTime(1910, 1, 1)) < 0)
            {
                Console.WriteLine("-----------DATUM STARIJI----------------");
                response["statusCode"] = "400";
                response["message"] += "\nDate of birth can not be before year 1910.";
            }
            else if(DateTime.Compare(user.DateOfBirth, DateTime.Now) > 0)
            {
                Console.WriteLine("-----------DATUM MLADJI----------------");
                response["statusCode"] = "400";
                response["message"] += "\nDate of birth can not be after today.";
            }
            #endregion BirthDateValidation

            #region UserTypeValidation
            if(user.UserType == null || user.UserType == string.Empty)
            {
                Console.WriteLine("----------PRAZAN TIP KORISNIKA-----------------");
                response["statusCode"] = "400";
                response["message"] += "\nUser type must not be empty.";
            }
            if(user.UserType != "buyer" && user.UserType != "seller")
            {
                Console.WriteLine("---------------POGRESAN TIP------------");
                response["statusCode"] = "400";
                response["message"] += "\nUnsupported user type. Supported types are buyer and seller.";
            }

            #endregion UserTypeValidation

            #region ImageValidation
            if(user.Image == null || user.Image == string.Empty)
            {
                Console.WriteLine("------------PRAZNA SLIKA---------------");
                response["statusCode"] = "400";
                response["message"] += "\nImage must not be empty.";
            }
            #endregion ImageValidation


            #region RegisteringUserInDataBase
            Console.WriteLine("UPISAN");
            UserDto newUser = userDto;
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            List<Claim> claims = new List<Claim>();
            if (newUser.UserType == "seller")
            {
                newUser.Verification = "processing";
            }
            else if (newUser.UserType == "buyer")
            {
                newUser.Verification = "verified";
            }
            try
            {
                User userToStore = _mapper.Map<User>(newUser);
                _dbContext.Users.Add(userToStore);
                await _dbContext.SaveChangesAsync();
                int userId = userToStore.UserId;
                claims.Add(new Claim("userId", userId.ToString()));
            }
            catch(Exception ex)
            {
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;
            }

            #endregion RegisteringUserInDataBase

            #region Token
            if (newUser.UserType == "admin")
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            if (newUser.UserType == "seller")
                claims.Add(new Claim(ClaimTypes.Role, "seller"));
            if (newUser.UserType == "buyer")
                claims.Add(new Claim(ClaimTypes.Role, "buyer"));


            claims.Add(new Claim("userType", newUser.UserType.ToString()));
            claims.Add(new Claim("verification", newUser.Verification.ToString()));
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:44398", //url servera koji je izdao token
                claims: claims, //claimovi
                expires: DateTime.Now.AddMinutes(60), //vazenje tokena u minutama
                signingCredentials: signinCredentials //kredencijali za potpis
            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            #endregion Token
            if (response["statusCode"] == "200")
            {
                response["token"] = tokenString;
            }
            
            return response;
        }

        public UserDto AddUser(UserDto newUser)
        {
            User user = _mapper.Map<User>(newUser);
            _dbContext.Users.Add(user);
            _dbContext.SaveChangesAsync();

            return _mapper.Map<UserDto>(newUser);  
        }

        public bool DeleteUser(int id)
        {
            try
            {
                User user = _dbContext.Users.Find(id);
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        public UserDto GetById(int id)
        {
            return _mapper.Map<UserDto>(_dbContext.Users.Find(id));
        }

        public List<UserDto> GetUsers()
        {
            return _mapper.Map<List<UserDto>>(_dbContext.Users.ToList());
        }

        public UserDto UpdateUser(int id, UserDto newUserData)
        {
            User user = _dbContext.Users.Find(id);
            if(user == null)
            {
                Console.WriteLine("NEMA TOG KORISNIKA");
                // napravi poruku o gresci na serveru
                throw new NotImplementedException();
            }
            if(newUserData.UserName != null && newUserData.UserName != string.Empty)
            {
                user.UserName = newUserData.UserName;
            }
            if (newUserData.Email != null && newUserData.Email != string.Empty)
            {
                user.Email = newUserData.Email;
            }
            if (newUserData.Password != null && newUserData.Password != string.Empty)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(newUserData.Password);
            }
            if (newUserData.FirstName != null && newUserData.FirstName != string.Empty)
            {
                user.FirstName = newUserData.FirstName;
            }
            if (newUserData.LastName != null && newUserData.LastName != string.Empty)
            {
                user.LastName = newUserData.LastName;
            }
            if (newUserData.DateOfBirth != null && newUserData.DateOfBirth != DateTime.Today)
            {
                user.DateOfBirth = newUserData.DateOfBirth;
            }
            if (newUserData.Image != null && newUserData.Image != string.Empty)
            {
                
                user.Image = newUserData.Image;
            }
            
            _dbContext.SaveChanges();

            Console.WriteLine("ZAVRSENE IZMENE");
            return _mapper.Map<UserDto>(user);
        }

        public List<UserDto> GetUnverifiedSellers()
        {
            List<UserDto> allUsers = GetUsers();
            List<UserDto> unverifiedUsers = new List<UserDto>();
            foreach(UserDto user in allUsers)
            {
                if(user.Verification == "processing")
                {
                    unverifiedUsers.Add(user);
                }
            }
            return unverifiedUsers;

        }

        public UserDto VerifyUser(int id, string option)
        {
            User user = _dbContext.Users.Find(id);
            if(option == "approve")
            {
                var mailMessage = new MailMessage
                {
                    Subject = "Account Verification",
                    Body = "<h1>Your account has been verified.</h1>",
                    IsBodyHtml = true,
                };
                mailMessage.From = new MailAddress(_senderEmail.Value);
                mailMessage.To.Add(user.Email);
                _smtpClient.Send(mailMessage);
                user.Verification = "verified";
            }
            else if(option == "deny")
            {
                user.Verification = "denied";
            }

            _dbContext.SaveChanges();
            return _mapper.Map<UserDto>(user);
        }
    }
}
