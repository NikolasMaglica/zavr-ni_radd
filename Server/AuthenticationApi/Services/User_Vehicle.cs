using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AutoMapper;
using System;

namespace AuthenticationApi.Services
{
    public class User_Vehicle : Repository<IUser_Vehicle>, IUser_Vehicle
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public User_Vehicle(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
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
            throw new NotImplementedException();
        }

        public User_Vehicle GetUser_VehiclebyId(int id)
        {
            throw new NotImplementedException();
        }

        public void DeleteUser_Vehicle(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser_Vehicle(int id, User_VehicleUpdate model)
        {
            throw new NotImplementedException();
        }
    }

}

       
