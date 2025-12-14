using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.Delete;

public record DeleteApplicationCommand(int Id) : IRequest<Result<Unit>>;