using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.Delete;

public class DeleteCandidateHandler(ICandidateRepository repository, IMapper mapper)
    : IRequestHandler<DeleteCandidateCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(DeleteCandidateCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var toDelete = await repository.GetByIdAsync(id);

        if (toDelete is null)
            return Result.Fail("Candidate not found");
        
        await repository.Delete(toDelete);
        return Result.Ok();
    }
}