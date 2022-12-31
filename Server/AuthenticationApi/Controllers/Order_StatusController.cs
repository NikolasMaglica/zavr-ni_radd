using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Order_StatusController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IOrder_Status _order_status;
        public Order_StatusController(AppDbContext appDbContext,
                    IMapper mapper, IOrder_Status order_status)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _order_status = order_status;
        }
        [HttpGet]
        public IActionResult GettAllOrder_Statuses()
        {
            var order_status = _order_status.GetAllOrder_Status();
            return Ok(order_status);
        }
        [HttpPost]
        public IActionResult Order_StatusCreate([FromBody] Order_StatusCreation model)
        {

            _order_status.Order_StatusCreate(model);
            return Ok(new { message = "Uspješan unos novog statusa narudžbe" });
        }
    }
}
