using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.Create;

public class CreateCompanyHandler(ICompanyRepository repository, IMapper mapper)
    : IRequestHandler<CreateCompanyCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
    {
        var company = mapper.Map<DAL.Entities.Company>(request);
        
        if(company is null)
            return Result.Fail("Company is not valid");
        
        await repository.CreateAsync(company);
        return Result.Ok();
    }
}