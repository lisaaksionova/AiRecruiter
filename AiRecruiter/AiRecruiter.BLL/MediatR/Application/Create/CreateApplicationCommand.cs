using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.Create;

public record CreateApplicationCommand(CreateApplicationDto Application) : IRequest<Result<Unit>>;