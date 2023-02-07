using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<Result<string>> CreateOrder(OrderCreation model)

        {
            try
            {
               
               
                    var order = _mapper.Map<Order>(model);
                    Create(order);
                    _appdbcontext.SaveChanges();
                    return Result.Ok();
                
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }



        }
 
        public async Task<Result<string>> DeleteOrder(int id)
        {
            try
            {
                var orders = _appDbContext.Order.Find(id);
                if (orders == null)
                {
                    throw new KeyNotFoundException($"Nardudžba s id={id} nije pronađena");
                }

                else
                {

                    Delete(orders);
                    _appDbContext.SaveChanges();
                    return Result.Ok();
                }

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
        public IEnumerable<Order> GetAllOrder()
        {
            return FindAll()
                                                      .OrderBy(ow => ow.id)
                                                      .ToList();
        }
        public async Task<Result<string>> UpdateOrder(int id, OrderUpdate model)
        {
            try
            {
                var update = _appDbContext.Order?.Find(id);
                if (update is null)
                {
                    throw new KeyNotFoundException("Narudzba nije pronađena u bazi podataka");

                }
                _mapper.Map(model, update);
                var material = _appDbContext.Materials!.Where(x => x.id == update.materialid).FirstOrDefault();
                var order = _appDbContext.Order!.Where(x => x.materialid == material!.id).FirstOrDefault();
                if (update.order_statusid == 1)
                {
                    material!.instockquantity += update!.quantity;
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
                return Result.Ok();

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }



        }
    }
}
