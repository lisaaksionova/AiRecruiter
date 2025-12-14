

using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.MediatR.Company.Create;
using AiRecruiter.BLL.MediatR.Company.Delete;
using AiRecruiter.BLL.MediatR.Company.GetAll;
using AiRecruiter.BLL.MediatR.Company.GetById;
using AiRecruiter.BLL.MediatR.Company.Update;
using Microsoft.AspNetCore.Mvc;

namespace AiRecruiter.API.Controllers;

public class CompanyController : BaseApiController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CompanyDto>))]
    public async Task<IActionResult> GetAll()
    {
        return HandleResult(await Mediator.Send(new GetAllCompanyQuery()));
    }
    
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CompanyDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(CompanyDto))]
    public async Task<IActionResult> GetById([FromQuery] int id)
    {
        return HandleResult(await Mediator.Send(new GetCompanyByIdQuery(id)));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CompanyDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(CompanyDto))]
    public async Task<IActionResult> Delete([FromQuery] int id)
    {
        return HandleResult(await Mediator.Send(new DeleteCompanyCommand(id)));

    }
    
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CreateCompanyDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(CreateCompanyDto))]
    public async Task<IActionResult> Create([FromBody] CreateCompanyDto company)
    {
        return HandleResult(await Mediator.Send(new CreateCompanyCommand(company)));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UpdateCompanyDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(UpdateCompanyDto))]
    public async Task<IActionResult> Update([FromBody] UpdateCompanyDto company)
    {
        return HandleResult(await Mediator.Send(new UpdateCompanyCommand(company)));
    }
}