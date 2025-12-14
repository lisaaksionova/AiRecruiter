using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.Update;

public class UpdateCandidateHandler(ICandidateRepository repository, IMapper mapper) :  IRequestHandler<UpdateCandidateCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(UpdateCandidateCommand request, CancellationToken cancellationToken)
    {
        var existingCandidate= await repository.GetByIdAsync(request.Candidate.Id);
        if (existingCandidate == null)
            return Result.Fail("Candidate not found");

        mapper.Map(request.Candidate, existingCandidate);

        await repository.Update(existingCandidate);

        return Result.Ok();
    }
}