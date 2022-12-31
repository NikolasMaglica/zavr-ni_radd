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
    public class MaterialController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IMaterial _material;

        public MaterialController(AppDbContext appDbContext,
                    IMapper mapper, IMaterial material)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _material = material;
        }

        [HttpGet]
        public IActionResult GettAllMaterials()
        {
            var material = _material.GetAllMaterial();
            return Ok(material);
        }
        [HttpPost]
        public IActionResult MaterialCreate([FromBody] MaterialCreation model)
        {

            _material.CreateMaterial(model);
            return Ok(new { message = "Uspješan unos novog materijala" });
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult MaterialDelete([FromRoute] int id)
        {
            _material.DeleteMaterial(id);
            return Ok(new { message = "Uspješan ste izbrisali materijal" });
        }

        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetMaterial([FromRoute] int id)
        {
            var material = _appDbContext.Materials?.FirstOrDefault(x => x.id == id);
            return Ok(material);
        }
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateClient(int id, [FromBody] MaterialUpdate model)
        {
            _material.UpdateMaterial(id, model);
            return Ok(new { message = "Podaci o klijentu  su ažurirani" });
        }
    }
}