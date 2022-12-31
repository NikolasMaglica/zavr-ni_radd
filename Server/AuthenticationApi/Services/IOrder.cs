using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IOrder
    {
        IEnumerable<Order> GetAllOrder();
        void CreateOrder(OrderCreation model);
        void DeleteOrder(int id);
        void UpdateOrder(int id, OrderUpdate model);
    }
}
