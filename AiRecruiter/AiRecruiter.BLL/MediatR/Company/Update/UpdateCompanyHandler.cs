using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.Update;

public class UpdateCompanyHandler(ICompanyRepository repository, IMapper mapper) :  IRequestHandler<UpdateCompanyCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(UpdateCompanyCommand request, CancellationToken cancellationToken)
    {
        var existingCompany= await repository.GetByIdAsync(request.Company.Id);
        if (existingCompany == null)
            return Result.Fail("Company not found");

        mapper.Map(request.Company, existingCompany);

        await repository.Update(existingCompany);

        return Result.Ok();
    }
}