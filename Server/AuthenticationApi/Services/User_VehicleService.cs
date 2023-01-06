using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;

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

        public void CreateUser_Vehicle(User_VehicleCreation model)
        {
            var uservehicle = _mapper.Map<User_Vehicle>(model);
            Create(uservehicle);
            _appdbcontext.SaveChanges();
        }

        public IEnumerable<User_Vehicle> GetAllUser_Vehicle()
        {
            return FindAll().OrderBy(ow => ow.id).ToList();
        }

        

        public void DeleteUser_Vehicle(int id)
        {
            var us = _appDbContext.User_Vehicle?.Find(id);
            if (us == null)
                throw new KeyNotFoundException($"Korisnikovo vozilo s {id} nije pronađeno u bazi podataka");
            _appdbcontext.Remove(us);
            _appDbContext.SaveChanges();
        }
        

        public void UpdateUser_Vehicle(int id, User_VehicleUpdate model)
        {
            var user_vehicle = _appdbcontext.User_Vehicle?.Find(id);
            if (user_vehicle == null)
                throw new KeyNotFoundException($"Korisnikovo vozilo s {id} nije pronađena u bazi podataka");
            _mapper.Map(model, user_vehicle);
            Update(user_vehicle);
            _appdbcontext.SaveChanges();
        }
    }

}

       
