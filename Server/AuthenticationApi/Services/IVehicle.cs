using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IVehicle
    {
        IEnumerable<Vehicle> GetAllVehicle();
        void CreateVehicle(VehicleCreation model);
        void DeleteVehicle(int id);
        void UpdateVehicle(int id, VehicleUpdate model);
    }
}
