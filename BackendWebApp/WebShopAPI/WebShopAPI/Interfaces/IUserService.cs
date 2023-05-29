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

        string Login(UserCredentialsDto credentialsDto);
        string Register(UserDto userDto);
    }
}
