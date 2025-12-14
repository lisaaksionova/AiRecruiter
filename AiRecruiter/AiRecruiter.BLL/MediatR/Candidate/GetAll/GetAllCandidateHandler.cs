using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.MediatR.Candidate.GetAll;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AiRecruiter.BLL.MediatR.Candidate.GetAll;

public class GetAllCandidateHandler(ICandidateRepository repository, IMapper mapper)
    : IRequestHandler<GetAllCandidateQuery, Result<IEnumerable<CandidateDto>>>
{
    public async Task<Result<IEnumerable<CandidateDto>>> Handle(GetAllCandidateQuery request, CancellationToken cancellationToken)
    {
        var query = repository.Query();

        if (request.query.Skills != null && request.query.Skills.Any())
        {
            query = query.Where(c => 
                c.Skills.Any(s => request.query.Skills.Contains(s))
            );
        }

        if (request.query.ExperienceYears.HasValue)
        {
            query = query.Where(v => v.ExperienceYears == request.query.ExperienceYears.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.query.Location))
        {
            query = query.Where(v => 
                v.Location.ToLower().Contains(request.query.Location.ToLower())
            );
        }
        
        var candidates = await query.ToListAsync(cancellationToken);

        var candidatesDtos = mapper.Map<IEnumerable<CandidateDto>>(candidates);
        return Result.Ok(candidatesDtos);
    }
}