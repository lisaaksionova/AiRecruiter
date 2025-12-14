using AiRecruiter.BLL.DTO;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.GetById;

public class GetCompanyByIdHandler(ICompanyRepository repository, IMapper mapper)
    : IRequestHandler<GetCompanyByIdQuery, Result<CompanyDto>>
{
    public async Task<Result<CompanyDto>> Handle(GetCompanyByIdQuery request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var company = await repository.GetByIdAsync(id);
        var companyDtos = mapper.Map<CompanyDto>(company);
        
        return companyDtos == null ? Result.Fail("Company not found") : Result.Ok(companyDtos);
    }
}