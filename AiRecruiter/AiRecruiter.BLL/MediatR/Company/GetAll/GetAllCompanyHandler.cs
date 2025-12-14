using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.MediatR.Candidate.GetAll;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.GetAll;

public class GetAllCompanyHandler(ICompanyRepository repository, IMapper mapper)
    : IRequestHandler<GetAllCompanyQuery, Result<IEnumerable<CompanyDto>>>
{
    public async Task<Result<IEnumerable<CompanyDto>>> Handle(GetAllCompanyQuery request, CancellationToken cancellationToken)
    {
        var company = await repository.GetAllAsync();
        var companyDtos = mapper.Map<IEnumerable<CompanyDto>>(company);

        return companyDtos == null ? Result.Fail("Company not found") : Result.Ok(companyDtos);
    }
}