using System.Net.Http.Json;
using AiRecruiter.BLL.DTO;
using AiRecruiter.DAL.Enums;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.GetSuited;

public class GetSuitedApplicationHandler : IRequestHandler<GetSuitedApplicationQuery, Result<IEnumerable<ApplicationDto>>>
{
    private readonly ICandidateRepository _candidateRepository;
    private readonly IApplicationRepository _applicationRepository;
    private readonly IMapper _mapper;
    private readonly HttpClient _httpClient;

    public GetSuitedApplicationHandler(
        ICandidateRepository candidateRepository,
        IApplicationRepository applicationRepository,
        IMapper mapper,
        IHttpClientFactory httpClientFactory)
    {
        _candidateRepository = candidateRepository;
        _applicationRepository = applicationRepository;
        _mapper = mapper;
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task<Result<IEnumerable<ApplicationDto>>> Handle(GetSuitedApplicationQuery request, CancellationToken cancellationToken)
    {
        var vacancy = request.Vacancy;
        
        var applications = _applicationRepository
            .Query()
            .Where(a => a.VacancyId == vacancy.Id)
            .Where(a => a.MatchPercent >= vacancy.MinMatchPercent)
            .Select(a => _mapper.Map<ApplicationDto>(a))
            .AsEnumerable();

        return applications.Any()
            ? Result.Ok(applications)
            : Result.Fail("No suitable candidates found");
    }
}