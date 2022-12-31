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
    public class ClientController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IClient _client;

        public ClientController(AppDbContext appDbContext,
                    IMapper mapper, IClient client)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _client = client;
        }

        [HttpGet]
        public IActionResult GettAllClients()
        {
            var client = _client.GetAllClients();
            return Ok(client);
        }
        [HttpPost]
        public IActionResult ClientCreate([FromBody] ClientCreation model)
        {

            _client.ClientCreate(model);
            return Ok(new { message = "Uspješan unos novog klijenta" });
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult ClientDelete([FromRoute] int id)
        {
            _client.DeleteClient(id);
            return Ok(new { message = "Uspješan ste izbrisali klijenta" });
        }

        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetClient([FromRoute] int id)
        {
            var client = _appDbContext.Clients?.FirstOrDefault(x => x.id == id);
            return Ok(client);
        }
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateClient(int id, [FromBody] ClientUpdate model)
        {
            _client.UpdateClient(id, model);
            return Ok(new { message = "Podaci o klijentu  su ažurirani" });
        }
    }
}