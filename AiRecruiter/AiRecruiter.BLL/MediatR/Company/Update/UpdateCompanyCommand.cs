using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.Update;

public record UpdateCompanyCommand(UpdateCompanyDto Company) : IRequest<Result<Unit>>;