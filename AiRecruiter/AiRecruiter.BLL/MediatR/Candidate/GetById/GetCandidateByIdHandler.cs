using AiRecruiter.BLL.DTO;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.GetById;

public class GetCandidateByIdHandler(ICandidateRepository repository, IMapper mapper)
    : IRequestHandler<GetCandidateByIdQuery, Result<CandidateDto>>
{
    public async Task<Result<CandidateDto>> Handle(GetCandidateByIdQuery request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var candidate = await repository.GetByIdAsync(id);
        var candidateDto = mapper.Map<CandidateDto>(candidate);
        
        return candidateDto == null ? Result.Fail("Candidate not found") : Result.Ok(candidateDto);
    }
}