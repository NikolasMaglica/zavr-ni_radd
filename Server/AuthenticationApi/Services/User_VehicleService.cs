using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;

namespace AuthenticationApi.Services
{
    public class User_VehicleService : Repository<User_Vehicle>, IUser_Vehicle
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public User_VehicleService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public async Task<Result<string>> CreateUser_Vehicle(User_VehicleCreation model)

        {
            try
            {
                   var user_vehicle = _mapper.Map<User_Vehicle>(model);
                    Create(user_vehicle);
                    _appdbcontext.SaveChanges();
                    return Result.Ok();
                }
            
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
        public IEnumerable<User_Vehicle> GetAllUser_Vehicle()
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

        public async Task<Result<string>> DeleteUser_Vehicle(int id)
        {
            try
            {
                var user_vehicle = _appDbContext.User_Vehicle.Find(id);
                if (user_vehicle == null)
                {
                    throw new KeyNotFoundException($"Korisnikovo vozilo s id={id} nije pronađeno");
                }
                else
                {

                    Delete(user_vehicle);
                    _appDbContext.SaveChanges();
                    return Result.Ok();
                }
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }

        public async Task<Result<string>> UpdateUser_Vehicle(int id, User_VehicleUpdate model)

        {
            try
            {
                var user_vehicle = _appdbcontext.User_Vehicle?.Find(id);
                if (user_vehicle == null)
                    throw new KeyNotFoundException($"Vrsta vozila s {id} nije pronađena u bazi podataka");
                user_vehicle.vehicleid = model.vehicleid;
                _mapper.Map(model, user_vehicle);
                Update(user_vehicle);
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



       
