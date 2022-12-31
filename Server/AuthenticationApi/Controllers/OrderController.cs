using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IOrder _order;
        public OrderController(AppDbContext appDbContext,
                    IMapper mapper, IOrder order)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _order = order;
        }
        [HttpGet]
        public IActionResult GettAllOrders()
        {
            var orders = _order.GetAllOrder();
            return Ok(orders);
        }
        [HttpPost]
        public IActionResult OrderCreate([FromBody] OrderCreation model)
        {

            _order.CreateOrder(model);
            return Ok(new { message = "Uspješan unos nove nardudžbe" });
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult OrderDelete([FromRoute] int id)
        {
            _order.DeleteOrder(id);
            return Ok(new { message = "Uspješan ste izbrisali narudžbu" });
        }

        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetOrder([FromRoute] int id)
        {
            var orders = _appDbContext.Order?.FirstOrDefault(x => x.id == id);
            return Ok(orders);
        }
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateOrder(int id, [FromBody] OrderUpdate model)
        {
            _order.UpdateOrder(id, model);
            return Ok(new { message = "Podaci o narudžbi su ažurirani" });
        }
    }
}

