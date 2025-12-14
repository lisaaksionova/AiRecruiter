using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.GetById;

public record GetApplicationByIdQuery(int Id)
        : IRequest<Result<ApplicationDto>>;