using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.Delete;

public class DeleteCompanyHandler(ICompanyRepository repository, IMapper mapper)
    : IRequestHandler<DeleteCompanyCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(DeleteCompanyCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var toDelete = await repository.GetByIdAsync(id);

        if (toDelete is null)
            return Result.Fail("Company not found");
        
        await repository.Delete(toDelete);
        return Result.Ok();
    }
}