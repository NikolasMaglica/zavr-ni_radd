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
  
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> ServiceCreate([FromBody] ServiceCreation model)
        {
            var result = await _service.ServiceCreate(model);
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

        public async Task<IActionResult> ServiceDelete([FromRoute] int id)
        {
            var result = await _service.DeleteService(id);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
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
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceUpdate model)
        {
            var result = await _service.UpdateService(id, model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }

}
}

