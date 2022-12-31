using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using System;
using System.Data.Entity;

namespace AuthenticationApi.Services
{
    public class OrderService : Repository<Order>, IOrder
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public OrderService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public void CreateOrder(OrderCreation model)
        {
            var order = _mapper.Map<Order>(model);
            Create(order);
            _appdbcontext.SaveChanges();
        }

        public void DeleteOrder(int id)
        {
            var order = _appDbContext.Order?.Find(id);
            if (order == null)
                throw new KeyNotFoundException($"Narudžba s {id} nije pronađena u bazi podataka");
            Delete(order);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Order> GetAllOrder()
        {
            return FindAll()
                                                      .OrderBy(ow => ow.date)
                                                      .ToList();
        }

        public void UpdateOrder(int id, OrderUpdate model)
        {
        
            var update = _appDbContext.Order?.Find(id);
            if (update is null)
            {
                throw new KeyNotFoundException("Narudzba nije pronađena u bazi podataka");

            }
            _mapper.Map(model, update);
            var material = _appDbContext.Materials!.Where(x => x.id == update.id).FirstOrDefault();
            var order = _appDbContext.Order!.Where(x => x.materialid == material!.id).AsNoTracking().FirstOrDefault();
            if (order.order_statusid == 1)
            {
                material!.instockquantity += order!.quantity;
                _appDbContext.Order.Update(update);
                _appDbContext.Materials!.Update(material!);
                _appDbContext.SaveChanges();
            }
            else
            {
                _appDbContext.Order.Update(update);
                _appDbContext.SaveChanges();
            }

            _appDbContext.SaveChanges();




        }
    }
}
