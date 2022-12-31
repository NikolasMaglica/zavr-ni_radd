using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;

namespace AuthenticationApi.Services
{
    public class VehicleService : Repository<Vehicle>, IVehicle
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public VehicleService(AppDbContext appdbcontext, IMapper mapper) : base(appdbcontext)
        {
            _appdbcontext = appdbcontext;
            _mapper = mapper;
        }

        public void CreateVehicle(VehicleCreation model)
        {
            var vehicles = _mapper.Map<Vehicle>(model);
            Create(vehicles);
            _appdbcontext.SaveChanges();
        }

        public void DeleteVehicle(int id)
        {
            var vehicles = _appDbContext.Vehicles.Find(id);
            if (vehicles == null)
                throw new KeyNotFoundException($"Vozilo s {id} nije pronađeno u bazi podataka");
            Delete(vehicles);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Vehicle> GetAllVehicle()
        {
            return FindAll()
                                                  .OrderBy(ow => ow.manufacturer)
                                                  .ToList();
        }

        public void UpdateVehicle(int id, VehicleUpdate model)
        {
            var vehicles = _appdbcontext.Vehicles?.Find(id);
            if (vehicles == null)
                throw new KeyNotFoundException($"Vozilo s {id} nije pronađeno u bazi podataka");
            vehicles.manufacturer = model.manufacturer;
            _mapper.Map(model, vehicles);
            Update(vehicles);
            _appdbcontext.SaveChanges();
        }
    }
}
