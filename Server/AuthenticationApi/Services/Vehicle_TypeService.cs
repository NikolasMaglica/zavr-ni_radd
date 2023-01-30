using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Result<string>> CreateVehicle_Types(Vehicle_TypeCreation model)
        
{
    var existingVehicleType = _appdbcontext.Vehicle_Types.FirstOrDefault(x => x.vehicle_typename == model.vehicle_typename);
            if (existingVehicleType != null)
            {
                return Result.Fail("Vozilo već postoji u bazi podataka.");
            }
            else
            {
                var vehicles = _mapper.Map<Vehicle_Type>(model);
                Create(vehicles);
                _appdbcontext.SaveChanges();
                return Result.Ok();
            }


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
