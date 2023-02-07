using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;

namespace AuthenticationApi.Services
{
    public interface IOrder
    {
        public IEnumerable<Order> GetAllOrder();
        Task<Result<string>> CreateOrder(OrderCreation model);

        Task<Result<string>> DeleteOrder(int id);
        Task<Result<string>> UpdateOrder(int id, OrderUpdate model);
    }
}
