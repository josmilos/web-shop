using WebShopAPI.Dto;

namespace WebShopAPI.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetUsers();
        UserDto GetById(int id);
        UserDto AddUser(UserDto newUser);
        UserDto UpdateUser(int id, UserDto newUserData);
        bool DeleteUser(int id);

        Dictionary<string, string> Login(UserCredentialsDto credentialsDto);
        Task<Dictionary<string, string>> Register(UserDto userDto);
        List<UserDto> GetUnverifiedSellers();

        UserDto VerifyUser(int Id, string option);
    }
}
