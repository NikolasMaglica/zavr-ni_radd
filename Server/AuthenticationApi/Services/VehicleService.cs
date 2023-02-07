using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;

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

       
        public async Task<Result<string>> CreateVehicle(VehicleCreation model)

        {
            try
            {                
                    var vehicles = _mapper.Map<Vehicle>(model);
                    Create(vehicles);
                    _appdbcontext.SaveChanges();
                    return Result.Ok();
                
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }



        }

        public async Task<Result<string>> DeleteVehicle(int id)
        {
            try
            {
                var vehicles = _appDbContext.Vehicles.Find(id);
                if (vehicles == null)
                {
                    throw new KeyNotFoundException($"Vozilo s id={id} nije pronađena");
                }


                var offers = _appDbContext.Offers.Where(o => o.vehicleid == id);
                var user_vehicle = _appDbContext.User_Vehicle.Where(o => o.vehicleid == id);

                if (offers.Any() || user_vehicle.Any())
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
        public IEnumerable<Vehicle> GetAllVehicle()
        {
            try
            {
                return FindAll()
                                                      .OrderBy(ow => ow.id);
           }
            catch (Exception ex)
            {
                throw new Exception("Greška: " + ex.Message);
            }
        }

        public async Task<Result<string>> UpdateVehicle(int id, VehicleUpdate model)

        {
            try
            {
                var vehicles = _appdbcontext.Vehicles?.Find(id);
                if (vehicles == null)
                    throw new KeyNotFoundException($"Vozilo s {id} nije pronađena u bazi podataka");
                
                var relatedRecords = _appdbcontext.User_Vehicle.Where(x => x.vehicleid == id);
                var relatedRecord_Offer = _appdbcontext.Offers.Where(x => x.vehicleid == id);

                if (relatedRecords.Any()||relatedRecord_Offer.Any())
                    throw new Exception("Vrsta vozila je povezana sa drugom tablicom i ne može se ažurirati");
                vehicles.manufacturer = model.manufacturer;
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
