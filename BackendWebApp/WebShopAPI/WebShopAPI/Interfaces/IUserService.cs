using WebShopAPI.Dto;
using WebShopAPI.Models;

namespace WebShopAPI.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetUsers();
        UserDto GetById(int id);
        UserDto AddUser(UserDto newUser);
        Dictionary<string, string> UpdateUser(int id, UserDto newUserData);
        bool DeleteUser(int id);

        Dictionary<string, string> Login(UserCredentialsDto credentialsDto);
        Task<Dictionary<string, string>> Register(UserDto userDto);
        List<UserDto> GetUnverifiedSellers();

        Dictionary<string, string> VerifyUser(int Id, string option);
    }
}
