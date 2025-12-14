using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.GetAll;

public record GetAllApplicationQuery() : IRequest<Result<IEnumerable<ApplicationDto>>>;