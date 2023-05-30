using AutoMapper;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
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
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;


        public UserService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }

        public string Login(UserCredentialsDto credentialsDto)
        {

            UserCredentialsDto user = _mapper.Map<List<UserCredentialsDto>>(_dbContext.Users.ToList()).First(x => x.Email == credentialsDto.Email);

            if(user == null)
            {
                return null;
            }
            
            if (BCrypt.Net.BCrypt.Verify(credentialsDto.Password, user.Password))
            {
                List<Claim> claims = new List<Claim>();
                if (credentialsDto.UserType == "admin")
                    claims.Add(new Claim(ClaimTypes.Role, "admin"));
                if (credentialsDto.UserType == "seller")
                    claims.Add(new Claim(ClaimTypes.Role, "seller"));
                if (credentialsDto.UserType == "buyer")
                    claims.Add(new Claim(ClaimTypes.Role, "buyer"));

                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:44398", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return tokenString;
            }
            else
            {
                return null;
            }
        }

        public string Register(UserDto userDto) {
            //userDto.DateOfBirth = 
            //UserDto user = _mapper.Map<List<UserDto>>(_dbContext.Users.ToList()).First(x => x.Email == userDto.Email);
            Console.WriteLine("START");
            User user = _mapper.Map<User>(userDto);

            List<UserDto> registeredUsers = GetUsers();
            if (user == null)
            {
                Console.WriteLine("-------------NEUSPESNO MAPIRANJE--------------");
                return null;
            }
            Console.WriteLine(user.UserName);
            #region UsernameValidation
            if (user.UserName == string.Empty || user.UserName == null)
            {
                Console.WriteLine("------------PRAZNO IME---------------");
                return null;
            }
            else if(user.UserName.Length < 3 || user.UserName.Length > 20)
            {
                Console.WriteLine("------------PREKRATKO/PREDUGACKO IME---------------");
                return null;
            }

            
            foreach (UserDto usr in registeredUsers)
            {
                Console.WriteLine(usr.UserName);
                if(user.UserName.ToLower() == usr.UserName)
                {
                    Console.WriteLine("--------------VEC POSTOJI USERNAME-------------");
                    return null;
                }
            }

            #endregion UsernameValidation

            #region EmailValidation
            if(user.Email == string.Empty || user.Email == null)
            {
                return null;
            }
            else if (!user.Email.Contains('@'))
            {
                return null;
            }
            else if(user.Email.Length < 6 || user.Email.Length > 30)
            {
                return null;
            }


            #endregion EmailValidation

            #region FirstnameValidation
            if(user.FirstName == string.Empty || user.FirstName == null)
            {
                return null;
            }
            else if(!Regex.IsMatch(user.FirstName, @"^[a-zA-Z]+$"))
            {
                return null;
            }
            else if(user.FirstName.Length < 2 || user.FirstName.Length > 30)
            {
                return null;
            }
            #endregion FirstnameValidation

            #region LastnameValidation
            if (user.LastName == string.Empty || user.LastName == null)
            {
                return null;
            }
            else if (!Regex.IsMatch(user.LastName, @"^[a-zA-Z]+$"))
            {
                return null;
            }
            else if (user.LastName.Length < 2 || user.LastName.Length > 30)
            {
                return null;
            }
            #endregion LastnameValidation

            #region AddressValidation
            if (user.Address == string.Empty || user.Address == null)
            {
                return null;
            }
            else if (Regex.IsMatch(user.Address, @"^[0-9]+$"))
            {
                return null;
            }
            else if (user.Address.Length < 5 || user.Address.Length > 50)
            {
                return null;
            }

            #endregion AddressValidation

            #region PasswordValidation
            if (user.Password == string.Empty || user.Password == null)
            {
                return null;
            }
            else if(user.Password.Length < 6 || user.Password.Length > 30)
            {
                return null;
            }
            #endregion PasswordValidation

            #region BirthDateValidation

            if(DateTime.Compare(user.DateOfBirth, new DateTime(1910, 1, 1)) < 0)
            {
                Console.WriteLine("-----------DATUM STARIJI----------------");
                return null;
            }
            else if(DateTime.Compare(user.DateOfBirth, DateTime.Now) > 0)
            {
                Console.WriteLine("-----------DATUM MLADJI----------------");
                return null;
            }
            #endregion BirthDateValidation

            #region UserTypeValidation
            if(user.UserType == null || user.UserType == string.Empty)
            {
                Console.WriteLine("----------PRAZAN TIP KORISNIKA-----------------");
                return null;
            }
            if(user.UserType != "buyer" && user.UserType != "seller")
            {
                Console.WriteLine("---------------POGRESAN TIP------------");
                return null;
            }

            #endregion UserTypeValidation

            #region ImageValidation
            if(user.Image == null || user.Image == string.Empty)
            {
                Console.WriteLine("------------PRAZNA SLIKA---------------");
                return null;
            }
            #endregion ImageValidation


            #region RegisteringUserInDataBase
            Console.WriteLine("UPISAN");
            UserDto newUser = userDto;
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            if(newUser.UserType == "seller")
            {
                newUser.Verification = "processing";
            }
            try
            {
                User userToStore = _mapper.Map<User>(newUser);
                _dbContext.Users.Add(userToStore);
                _dbContext.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return null;
            }

            #endregion RegisteringUserInDataBase

            #region Token
            List<Claim> claims = new List<Claim>();
            if (newUser.UserType == "admin")
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            if (newUser.UserType == "seller")
                claims.Add(new Claim(ClaimTypes.Role, "seller"));
            if (newUser.UserType == "buyer")
                claims.Add(new Claim(ClaimTypes.Role, "buyer"));

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:44398", //url servera koji je izdao token
                claims: claims, //claimovi
                expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                signingCredentials: signinCredentials //kredencijali za potpis
            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
            #endregion Token
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
            user.UserName = newUserData.UserName;
            user.Email = newUserData.Email;
            user.Password = newUserData.Password;
            user.FirstName = newUserData.FirstName;
            user.LastName = newUserData.LastName;
            user.DateOfBirth = newUserData.DateOfBirth;
            user.Image = newUserData.Image;
            user.Verification = newUserData.Verification;
            _dbContext.SaveChanges();

            return _mapper.Map<UserDto>(user);
        }
    }
}
