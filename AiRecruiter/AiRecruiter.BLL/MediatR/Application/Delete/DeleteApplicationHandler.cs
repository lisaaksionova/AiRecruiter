using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.Delete;

public class DeleteApplicationHandler(IApplicationRepository repository, IMapper mapper)
    : IRequestHandler<DeleteApplicationCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(DeleteApplicationCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var toDelete = await repository.GetByIdAsync(id);

        if (toDelete is null)
            return Result.Fail("Application not found");
        
        await repository.Delete(toDelete);
        return Result.Ok();
    }
}