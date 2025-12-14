
using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.Create;

public record CreateCompanyCommand(CreateCompanyDto Candidate) : IRequest<Result<Unit>>;