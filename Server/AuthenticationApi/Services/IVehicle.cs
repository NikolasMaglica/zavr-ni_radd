using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;

namespace AuthenticationApi.Services
{
    public interface IVehicle
    {

        public IEnumerable<Vehicle> GetAllVehicle();
        Task<Result<string>> CreateVehicle(VehicleCreation model);

        Task<Result<string>> DeleteVehicle(int id);
        Task<Result<string>> UpdateVehicle(int id, VehicleUpdate model);
    }
}
