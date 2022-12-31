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
    public class ServiceController : Controller
    { 
    private readonly AppDbContext _appDbContext;
    private IMapper _mapper;
    private IService _service;
    public ServiceController(AppDbContext appDbContext,
                IMapper mapper, IService iservice)
    {
        _appDbContext = appDbContext;
        _mapper = mapper;
        _service = iservice;
    }
    [HttpGet]
    public IActionResult GettAllServices()
    {
        var services = _service.GetAllServices();
        return Ok(services);
    }
    [HttpPost]
    public IActionResult ServiceCreate([FromBody] ServiceCreation model)
    {

        _service.ServiceCreate(model);
        return Ok(new { message = "Uspješan unos nove usluge" });
    }
    [HttpDelete]
    [Route("{id:int}")]
    public IActionResult ServiceDelete([FromRoute] int id)
    {
        _service.DeleteService(id);
        return Ok(new { message = "Uspješan ste izbrisali uslugu" });
    }

    [HttpGet]
    [Route("{id:int}")]

    public IActionResult GetService([FromRoute] int id)
    {
        var services = _appDbContext.Services?.FirstOrDefault(x => x.id == id);
        return Ok(services);
    }
    [HttpPut]
    [Route("{id:int}")]
    public IActionResult UpdateService(int id, [FromBody] ServiceUpdate model)
    {
        _service.UpdateService(id,model);
        return Ok(new { message = "Podaci o usluzi  su ažurirani" });
    }
}
}

