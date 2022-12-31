using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IVehicle _vehicle;
        public VehicleController(AppDbContext appDbContext,
                    IMapper mapper, IVehicle ivehicle)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _vehicle = ivehicle;
        }
        [HttpGet]
        public IActionResult GettAllVehicle()
        {
            var vehicles = _vehicle.GetAllVehicle();
            return Ok(vehicles);
        }
        [HttpPost]
        public IActionResult VehicleCreate([FromBody] VehicleCreation model)
        {

            _vehicle.CreateVehicle(model);
            return Ok(new { message = "Uspješan unos novog vozila" });
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult VehicleDelete([FromRoute] int id)
        {
            _vehicle.DeleteVehicle(id);
            return Ok(new { message = "Uspješan ste izbrisali vozilo" });
        }

        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetVehicle([FromRoute] int id)
        {
            var vehicles = _appDbContext.Vehicles?.FirstOrDefault(x => x.id == id);
            return Ok(vehicles);
        }
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateVehicle(int id, [FromBody] VehicleUpdate model)
        {
            _vehicle.UpdateVehicle(id, model);
            return Ok(new { message = "Podaci o vozilu su ažurirani" });
        }
    }
}
