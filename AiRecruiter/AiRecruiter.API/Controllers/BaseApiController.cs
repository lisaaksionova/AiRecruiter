using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AiRecruiter.API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
[Authorize]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator => _mediator ??=
        HttpContext.RequestServices.GetService<IMediator>() !;
    
    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if(result.IsSuccess)
            return Ok(result.Value);
        return BadRequest(result.Errors.Select(e => new Error(e.Message)));
    }
}