using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;

namespace AuthenticationApi.Services
{
    public interface IMaterial
    {

        public IEnumerable<Material> GetAllMaterial();
        Task<Result<string>> CreateMaterial(MaterialCreation model);

        Task<Result<string>> DeleteMaterial(int id);
        Task<Result<string>> UpdateMaterial(int id, MaterialUpdate model);
    }
}
