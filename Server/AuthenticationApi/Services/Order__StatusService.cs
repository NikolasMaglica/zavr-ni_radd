using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;

namespace AuthenticationApi.Services
{
    public class Order__StatusService : Repository<Order_Status>, IOrder_Status
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public Order__StatusService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public IEnumerable<Order_Status> GetAllOrder_Status()
        {
            return FindAll()
                                                           .OrderBy(ow => ow.status)
                                                           .ToList();
        }

        public void Order_StatusCreate(Order_StatusCreation model)
        {
            var order_status = _mapper.Map<Order_Status>(model);
            Create(order_status);
            _appdbcontext.SaveChanges();
        }
    }
}
