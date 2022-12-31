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
    public class Material_OfferController : Controller
    { 
       private readonly AppDbContext _appDbContext;
    private IMapper _mapper;
    private IMaterial_Offer _material_offer;

    public Material_OfferController(AppDbContext appDbContext,
                IMapper mapper, IMaterial_Offer material_offer)
    {
        _appDbContext = appDbContext;
        _mapper = mapper;
        _material_offer = material_offer;
    }

    [HttpGet]
    public IActionResult GettAllMaterial_Offer()
    {
        var material_offer = _material_offer.GetAllMaterial_Offer();
        return Ok(material_offer);
    }
    [HttpPost]
    public IActionResult Material_OfferCreate([FromBody] Material_OfferCreation model)
    {

            _material_offer.Create_Offer_Material(model);
        return Ok(new { message = "Uspješan novog materijala na ponudu" });
    }
    [HttpDelete]
    [Route("{id:int}")]
    public IActionResult Material_OfferDelete([FromRoute] int id)
    {
        _material_offer.DeleteMaterial_Offer(id);
        return Ok(new { message = "Uspješan ste izbrisali materijal na ponudi" });
    }

    [HttpGet]
    [Route("{id:int}")]

    public IActionResult GetMaterial_Offer([FromRoute] int id)
    {
           
        var material_offer = _appDbContext.Material_offer?.FirstOrDefault(x => x.id == id);
        return Ok(material_offer);
    }
    [HttpPut]
    [Route("{id:int}")]
    public IActionResult UpdateMaterial_Offer(int id, [FromBody] Material_OfferUpdate model)
    {
        _material_offer.UpdateMaterial_Offer(id, model);
        return Ok(new { message = "Podaci o materijalu na ponudi su ažurirani" });
    }
}
}