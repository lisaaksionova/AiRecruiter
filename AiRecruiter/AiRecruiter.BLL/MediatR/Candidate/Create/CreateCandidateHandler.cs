using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.Create;

public class CreateCandidateHandler(ICandidateRepository repository, IMapper mapper)
    : IRequestHandler<CreateCandidateCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(CreateCandidateCommand request, CancellationToken cancellationToken)
    {
        var candidate = mapper.Map<DAL.Entities.Candidate>(request.Candidate);
        
        if(candidate is null)
            return Result.Fail("Candidate is not valid");
        
        await repository.CreateAsync(candidate);
        return Result.Ok();
    }
}