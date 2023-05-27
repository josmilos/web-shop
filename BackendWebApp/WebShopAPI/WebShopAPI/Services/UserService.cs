using AutoMapper;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
            //BCrypt.Net.BCrypt.Verify(credentialsDto.Password, user.Password)
            if (user.Password == credentialsDto.Password)
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

        public UserDto AddUser(UserDto newUser)
        {
            User user = _mapper.Map<User>(newUser);
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

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
            user.Verified = newUserData.Verified;
            _dbContext.SaveChanges();

            return _mapper.Map<UserDto>(user);
        }
    }
}
