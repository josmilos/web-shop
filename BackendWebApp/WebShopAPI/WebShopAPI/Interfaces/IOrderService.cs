using WebShopAPI.Dto;


namespace WebShopAPI.Interfaces
{
    public interface IOrderService
    {
        List<OrderDto> GetOrders();
        OrderDto GetById(int id);
        OrderDto AddOrder(OrderDto newOrder);
        OrderDto UpdateOrder(int id, OrderDto newOrderData);
        OrderDto EditStatusOrder(int id, OrderEditDto newOrderData);
        bool DeleteOrder(int id);
        List<OrderDto> GetSellerNewOrders(int id);
        List<OrderDto> GetSellerHistoryOrders(int id);
        List<OrderDto> GetBuyerOrders(int id);
    }
}
