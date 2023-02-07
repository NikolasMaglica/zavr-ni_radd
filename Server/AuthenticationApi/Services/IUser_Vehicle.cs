using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;

namespace AuthenticationApi.Services
{
    public interface IUser_Vehicle
    {
        
        public IEnumerable<User_Vehicle> GetAllUser_Vehicle();
        Task<Result<string>> CreateUser_Vehicle(User_VehicleCreation model);

        Task<Result<string>> DeleteUser_Vehicle(int id);
        Task<Result<string>> UpdateUser_Vehicle(int id, User_VehicleUpdate model);
    }
}
