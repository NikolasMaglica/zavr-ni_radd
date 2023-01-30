using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Services
{
    public interface IVehicle_Type
    {
        IEnumerable<Vehicle_Type> GetAllVehicle_Types();
        Task<Result<string>> CreateVehicle_Types(Vehicle_TypeCreation model);

        void DeleteVehicle_Types(int id);
        void UpdateVehicle_Types(int id, Vehicle_TypeUpdate model);
    }
}
