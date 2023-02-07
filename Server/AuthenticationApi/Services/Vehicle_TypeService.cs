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
            try
            {
                return FindAll()
                                           .OrderBy(ow => ow.id)
                                           .ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Greška: " + ex.Message);
            }
        }

        public async Task<Result<string>> CreateVehicle_Types(Vehicle_TypeCreation model)
        
         {
            try
            {
                var existingVehicleType = _appdbcontext.Vehicle_Types.FirstOrDefault(x => x.vehicle_typename == model.vehicle_typename);
                if (existingVehicleType != null)
                {
                    throw new Exception("Naziv vrste vozila je unesen");
                }
                else
                {
                    var vehicles = _mapper.Map<Vehicle_Type>(model);
                    Create(vehicles);
                    _appdbcontext.SaveChanges();
                    return Result.Ok();
                }
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: "+ex.Message);
            }



        }

        public async Task<Result<string>> DeleteVehicle_Types(int id)
        {
            try
            {
                var vehicles = _appDbContext.Vehicle_Types.Find(id);
                if (vehicles == null)
                {
                    throw new KeyNotFoundException($"Vrsta vozila s id={id} nije pronađena");
                }
         
                
                    var offers = _appDbContext.Offers.Where(o => o.vehicleid == id);
                if (offers.Any())
                {
                    throw new InvalidOperationException("Zapis je povezan s drugim zapisom");
                }

                else
                {

                    Delete(vehicles);
                    _appDbContext.SaveChanges();
                    return Result.Ok();
                }
                
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
         
      public async Task<Result<string>> UpdateVehicle_Types(int id, Vehicle_TypeUpdate model)

        {
            try
            {
                var vehicles = _appdbcontext.Vehicle_Types?.Find(id);
                if (vehicles == null)
                    throw new KeyNotFoundException($"Vrsta vozila s {id} nije pronađena u bazi podataka");
                var existingVehicleType = _appdbcontext.Vehicle_Types.FirstOrDefault(x => x.vehicle_typename == model.vehicle_typename);
                if (existingVehicleType != null && existingVehicleType.id != id)
                    throw new Exception("Vrsta vozila s tim imenom već postoji u bazi podataka");
                var relatedRecords = _appdbcontext.Vehicles.Where(x => x.vehicle_typeid == id);
                if (relatedRecords.Any())
                    throw new Exception("Vrsta vozila je povezana sa drugom tablicom i ne može se ažurirati");
                vehicles.vehicle_typename = model.vehicle_typename;
                _mapper.Map(model, vehicles);
                Update(vehicles);
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
