using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.GetAll;

public record GetAllCompanyQuery() : IRequest<Result<IEnumerable<CompanyDto>>>;