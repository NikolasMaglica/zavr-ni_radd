using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IMaterial
    {
        IEnumerable<Material> GetAllMaterial();
        void CreateMaterial(MaterialCreation model);
        void DeleteMaterial(int id);
        void UpdateMaterial(int id, MaterialUpdate model);
    }
}
