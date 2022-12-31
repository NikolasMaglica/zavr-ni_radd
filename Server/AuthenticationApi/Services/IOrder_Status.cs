using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IOrder_Status
    {
        IEnumerable<Order_Status> GetAllOrder_Status();
        void Order_StatusCreate(Order_StatusCreation model);
    }
}
