using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IVehicle_Type
    {
        IEnumerable<Vehicle_Type> GetAllVehicle_Types();
        void CreateVehicle_Types(Vehicle_TypeCreation model);
        void DeleteVehicle_Types(int id);
        void UpdateVehicle_Types(int id, Vehicle_TypeUpdate model);
    }
}
