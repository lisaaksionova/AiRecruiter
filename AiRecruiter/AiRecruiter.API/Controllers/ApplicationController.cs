
using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.MediatR.Application.Create;
using AiRecruiter.BLL.MediatR.Application.Delete;
using AiRecruiter.BLL.MediatR.Application.GetAll;
using AiRecruiter.BLL.MediatR.Application.GetById;
using AiRecruiter.BLL.MediatR.Application.Update;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AiRecruiter.API.Controllers;

public class ApplicationController : BaseApiController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ApplicationDto>))]
    public async Task<IActionResult> GetAll()
    {
        return HandleResult(await Mediator.Send(new GetAllApplicationQuery()));
    }
    
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApplicationDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ApplicationDto))]
    public async Task<IActionResult> GetById([FromQuery] int id)
    {
        return HandleResult(await Mediator.Send(new GetApplicationByIdQuery(id)));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApplicationDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApplicationDto))]
    public async Task<IActionResult> Delete([FromQuery] int id)
    {
        return HandleResult(await Mediator.Send(new DeleteApplicationCommand(id)));

    }
    
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CreateApplicationDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(CreateApplicationDto))]
    public async Task<IActionResult> Create([FromBody] CreateApplicationDto application)
    {
        return HandleResult(await Mediator.Send(new CreateApplicationCommand(application)));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UpdateApplicationDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(UpdateApplicationDto))]
    public async Task<IActionResult> Update([FromBody] UpdateApplicationDto application)
    {
        return HandleResult(await Mediator.Send(new UpdateApplicationCommand(application)));
    }
}