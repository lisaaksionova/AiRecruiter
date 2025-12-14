using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.GetById;

public record GetCompanyByIdQuery(int Id) : IRequest<Result<CompanyDto>>;