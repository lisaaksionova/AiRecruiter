using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.Update;

public class UpdateApplicationHandler(IApplicationRepository repository, IMapper mapper) :  IRequestHandler<UpdateApplicationCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(UpdateApplicationCommand request, CancellationToken cancellationToken)
    {
        var existingApplication = await repository.GetByIdAsync(request.Application.Id);
        if (existingApplication == null)
            return Result.Fail("Application not found");

        existingApplication.Status = request.Application.Status;

        await repository.Update(existingApplication);

        return Result.Ok();
    }
}