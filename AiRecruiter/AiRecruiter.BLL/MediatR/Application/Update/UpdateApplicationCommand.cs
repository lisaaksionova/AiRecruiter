using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.Update;

public record UpdateApplicationCommand(UpdateApplicationDto Application) : IRequest<Result<Unit>>;