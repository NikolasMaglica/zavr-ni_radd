using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AuthenticationApi.Extensions;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> MaterialCreate([FromBody] MaterialCreation model)
        {
            var result = await _material.CreateMaterial(model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [AllowAnonymous]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]

        public async Task<IActionResult> MaterialDelete([FromRoute] int id)
        {
            var result = await _material.DeleteMaterial(id);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
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
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] MaterialUpdate model)
        {
            var result = await _material.UpdateMaterial(id, model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }
    }
}