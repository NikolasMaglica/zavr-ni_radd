using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;

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

        public async Task<Result<string>> CreateMaterial(MaterialCreation model)

        {
            try
            {
                var existingMaterial = _appdbcontext.Materials.FirstOrDefault(x => x.name == model.name);
                if (existingMaterial != null)
                {
                    throw new Exception("Naziv materijala je unesen");
                }
                else
                {
                    var materials = _mapper.Map<Material>(model);
                    Create(materials);
                    _appdbcontext.SaveChanges();
                    return Result.Ok();
                }
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }



        }    
       public async Task<Result<string>> DeleteMaterial(int id)
        {
            try
            {
                var material = _appDbContext.Materials.Find(id);
                if (material == null)
                {
                    throw new KeyNotFoundException($"Material s id={id} nije pronađena");
                }


                var offers = _appDbContext.Offers.Where(o => o.materialid == id);
                var orders = _appDbContext.Order.Where(o => o.materialid == id);

                if (offers.Any()||orders.Any())
                {
                    throw new InvalidOperationException("Zapis je povezan s drugim zapisom");
                }

                else
                {

                    Delete(material);
                    _appDbContext.SaveChanges();
                    return Result.Ok();
                }

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
        public IEnumerable<Material> GetAllMaterial()
        {
            try
            {
                return FindAll().OrderBy(ow => ow.id).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Greška: " + ex.Message);
            }
        }

        public async Task<Result<string>> UpdateMaterial(int id, MaterialUpdate model)

        {
            try
            {
                var material = _appdbcontext.Materials?.Find(id);
                if (material == null)
                    throw new KeyNotFoundException($"Material s {id} nije pronađen u bazi podataka");
                var existingMaterial = _appdbcontext.Materials.FirstOrDefault(x => x.name == model.name);
                if (existingMaterial != null && existingMaterial.id != id)
                    throw new Exception("Materijal već postoji u bazi podataka");
                var relatedRecords = _appdbcontext.Offers.Where(x => x.materialid == id);
                var relatedRecords_Order = _appdbcontext.Order.Where(x => x.materialid == id);

                if (relatedRecords.Any() || relatedRecords_Order.Any())
                    throw new Exception("Vrsta vozila je povezana sa drugom tablicom i ne može se ažurirati");
                material.name = model.name;
                _mapper.Map(model, material);
                Update(material);
                _appdbcontext.SaveChanges();
                return Result.Ok();

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
    
}
}
