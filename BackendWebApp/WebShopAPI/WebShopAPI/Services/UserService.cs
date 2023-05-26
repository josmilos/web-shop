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

        private List<UserCredentialsDto> users = new List<UserCredentialsDto>()
        {
            new UserCredentialsDto
            {
                UserId = 1,
                Email = "pedja",
                Password = "$2a$11$L.fb./NAUzUTNLGFJiv8quleGSjDb.30RCG2BKYjxp6GNtGIT5/ji", //1234
                UserType = "admin"
            },
              new UserCredentialsDto
            {
                UserId = 2,
                Email = "tanja",
                Password = "$2a$11$L.fb./NAUzUTNLGFJiv8quleGSjDb.30RCG2BKYjxp6GNtGIT5/ji", //1234
                UserType = "seller"
            },
                new UserCredentialsDto
            {
                UserId = 3,
                Email = "pera",
                Password = "$2a$11$L.fb./NAUzUTNLGFJiv8quleGSjDb.30RCG2BKYjxp6GNtGIT5/ji", //1234
                UserType = "buyer"
            }
        };

        public UserService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }

        public string Login(UserCredentialsDto credentialsDto)
        {
            UserCredentialsDto user = users.First(x => x.Email == credentialsDto.Email);

            if(user == null)
            {
                return null;
            }

            if(BCrypt.Net.BCrypt.Verify(credentialsDto.Password, user.Password))
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

        public void DeleteUser(int id)
        {
            User user = _dbContext.Users.Find(id);
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
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
