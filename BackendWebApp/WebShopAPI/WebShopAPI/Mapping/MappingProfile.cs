using AutoMapper;
using WebShopAPI.Dto;
using WebShopAPI.Models;

namespace WebShopAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        { 
            CreateMap<User,UserDto>().ReverseMap();
            CreateMap<User, UserCredentialsDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<ProductOrder, ProductOrderDto>().ReverseMap();
        }
    }
}
