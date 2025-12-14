using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.Helpers;
using AiRecruiter.BLL.MediatR.Candidate.Create;
using AiRecruiter.BLL.MediatR.Candidate.Delete;
using AiRecruiter.BLL.MediatR.Candidate.GetAll;
using AiRecruiter.BLL.MediatR.Candidate.GetById;
using AiRecruiter.BLL.MediatR.Candidate.Update;
using Microsoft.AspNetCore.Mvc;

namespace AiRecruiter.API.Controllers;

public class CandidateController : BaseApiController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CandidateDto>))]
    public async Task<IActionResult> GetAll([FromQuery] CandidateQueryRequest? query)
    {
        return HandleResult(await Mediator.Send(new GetAllCandidateQuery(query)));
    }
    
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CandidateDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(CandidateDto))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        return HandleResult(await Mediator.Send(new GetCandidateByIdQuery(id)));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CandidateDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(CandidateDto))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        return HandleResult(await Mediator.Send(new DeleteCandidateCommand(id)));

    }
    
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CreateCandidateDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(CreateCandidateDto))]
    public async Task<IActionResult> Create([FromBody] CreateCandidateDto candidate)
    {
        return HandleResult(await Mediator.Send(new CreateCandidateCommand(candidate)));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UpdateCandidateDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(UpdateCandidateDto))]
    public async Task<IActionResult> Update([FromBody] UpdateCandidateDto candidate)
    {
        return HandleResult(await Mediator.Send(new UpdateCandidateCommand(candidate)));
    }
}