using System.Security.Claims;
using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.Helpers;
using AiRecruiter.BLL.MediatR.Vacancy.Create;
using AiRecruiter.BLL.MediatR.Vacancy.Delete;
using AiRecruiter.BLL.MediatR.Vacancy.GetAll;
using AiRecruiter.BLL.MediatR.Vacancy.GetById;
using AiRecruiter.BLL.MediatR.Vacancy.Update;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AiRecruiter.API.Controllers;

public class VacancyController : BaseApiController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<VacancyDto>))]
    public async Task<IActionResult> GetAll([FromQuery] VacancyQueryRequest? query)
    {
        return HandleResult(await Mediator.Send(new GetAllVacancyQuery(query)));
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VacancyDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(VacancyDto))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        return HandleResult(await Mediator.Send(new GetVacancyByIdQuery(id)));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VacancyDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(VacancyDto))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        return HandleResult(await Mediator.Send(new DeleteVacancyCommand(id)));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CreateVacancyDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(CreateVacancyDto))]
    public async Task<IActionResult> Create([FromBody] CreateVacancyDto vacancy)
    {
        return HandleResult(await Mediator.Send(new CreateVacancyCommand(vacancy)));
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UpdateVacancyDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(UpdateVacancyDto))]
    public async Task<IActionResult> Update([FromBody] UpdateVacancyDto vacancy)
    {
        return HandleResult(await Mediator.Send(new UpdateVacancyCommand(vacancy)));
    }
}
