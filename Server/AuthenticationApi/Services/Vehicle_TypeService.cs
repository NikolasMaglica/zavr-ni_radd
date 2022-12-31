using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using System;

namespace AuthenticationApi.Services
{
    public class Vehicle_TypeService : Repository<Vehicle_Type>, IVehicle_Type
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public Vehicle_TypeService(AppDbContext appdbcontext, IMapper mapper) : base(appdbcontext)
        {
            _appdbcontext = appdbcontext;
            _mapper = mapper;
        }

        public IEnumerable<Vehicle_Type> GetAllVehicle_Types()
        {
            return FindAll()
                                       .OrderBy(ow => ow.vehicle_typename)
                                       .ToList();
        }

        public void CreateVehicle_Types(Vehicle_TypeCreation model)
        {
            var vehicles = _mapper.Map<Vehicle_Type>(model);
            Create(vehicles);
            _appdbcontext.SaveChanges();
        }

        public void DeleteVehicle_Types(int id)
        {
            var vehicles = _appDbContext.Vehicle_Types.Find(id);
            if (vehicles == null)
                throw new KeyNotFoundException($"Vrsta vozila s {id} nije pronađeno u bazi podataka");
            Delete(vehicles);
            _appDbContext.SaveChanges();
        }

        public void UpdateVehicle_Types(int id, Vehicle_TypeUpdate model)
        {
            var vehicles = _appdbcontext.Vehicle_Types?.Find(id);
            if (vehicles == null)
                throw new KeyNotFoundException($"Vrsta vozila s {id} nije pronađena u bazi podataka");
            vehicles.vehicle_typename = model.vehicle_typename;
            _mapper.Map(model, vehicles);
            Update(vehicles);
            _appdbcontext.SaveChanges();
        }
    }
}
