using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;

namespace AuthenticationApi.Services
{
    public class MaterialService : Repository<Material>, IMaterial
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public MaterialService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public void CreateMaterial(MaterialCreation model)
        {
            var material = _mapper.Map<Material>(model);
            Create(material);
            _appdbcontext.SaveChanges();
        }

        public void DeleteMaterial(int id)
        {
            var material = _appDbContext.Materials.Find(id);
            if (material == null)
                throw new KeyNotFoundException($"Materijal s {id} nije pronađen u bazi podataka");
            Delete(material);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Material> GetAllMaterial()
        {
            return FindAll()
                                                      .OrderBy(ow => ow.price)
                                                      .ToList();
        }

        public void UpdateMaterial(int id, MaterialUpdate model)
        {
            var material = _appdbcontext.Materials?.Find(id);
            if (material == null)
                throw new KeyNotFoundException($"Material s {id} nije pronađen u bazi podataka");
            material.price = model.price;
            _mapper.Map(model, material);
            Update(material);
            _appdbcontext.SaveChanges();
        }
    }
}
