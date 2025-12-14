using System.Security.Claims;
using AiRecruiter.BLL.DTO;
using AiRecruiter.DAL.Entities;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Json;
using AiRecruiter.DAL.Enums;

namespace AiRecruiter.BLL.MediatR.Application.Create;

public class CreateApplicationHandler : IRequestHandler<CreateApplicationCommand, Result<Unit>>
{
    private readonly IApplicationRepository _applicationRepository;
    private readonly ICandidateRepository _candidateRepository;
    private readonly ICompanyRepository _companyRepository;
    private readonly IVacancyRepository _vacancyRepository;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<User> _userManager;
    private readonly HttpClient _httpClient;

    public CreateApplicationHandler(
        IApplicationRepository applicationRepository,
        ICandidateRepository candidateRepository,
        ICompanyRepository companyRepository,
        IVacancyRepository vacancyRepository,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager,
        IHttpClientFactory httpClientFactory)
    {
        _applicationRepository = applicationRepository;
        _candidateRepository = candidateRepository;
        _companyRepository = companyRepository;
        _vacancyRepository = vacancyRepository;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task<Result<Unit>> Handle(CreateApplicationCommand request, CancellationToken cancellationToken)
    {
        // 🔹 1. Identify current user
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Result.Fail("Unauthorized user.");

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Result.Fail("User not found.");

        // 🔹 2. Determine role
        var roles = await _userManager.GetRolesAsync(user);
        if (roles == null || roles.Count == 0)
            return Result.Fail("User has no role assigned.");

        var application = _mapper.Map<DAL.Entities.Application>(request.Application);
        application.AppliedAt = DateTime.UtcNow;

        DAL.Entities.Candidate? candidate = null;

        // 🔹 3. Role-specific handling
        if (roles.Contains("Candidate"))
        {
            candidate = await _candidateRepository.Query()
                .FirstOrDefaultAsync(c => c.UserId == user.Id, cancellationToken);
            if (candidate == null)
                return Result.Fail("Candidate profile not found for this user.");

            application.CandidateId = candidate.Id;
        }
        else if (roles.Contains("Company"))
        {
            var company = await _companyRepository.Query()
                .FirstOrDefaultAsync(c => c.UserId == user.Id, cancellationToken);
            if (company == null)
                return Result.Fail("Company profile not found for this user.");

            var vacancy = await _vacancyRepository.GetByIdAsync(request.Application.VacancyId);
            if (vacancy == null || vacancy.CompanyId != company.Id)
                return Result.Fail("You can only create applications for your own vacancies.");

            // Here, we’ll assume the company picks a candidate manually (CandidateId must be set in request)
            candidate = await _candidateRepository.GetByIdAsync(request.Application.CandidateId);
            if (candidate == null)
                return Result.Fail("Candidate not found.");
        }
        else
        {
            return Result.Fail("Only candidates or companies can create applications.");
        }

        // 🔹 4. Load the vacancy
        var vacancyEntity = await _vacancyRepository.GetByIdAsync(request.Application.VacancyId);
        if (vacancyEntity == null)
            return Result.Fail("Vacancy not found.");

        // 🔹 5. Compute match percent using ML service
        var vacancyDto = _mapper.Map<VacancyDto>(vacancyEntity);
        var candidateDto = _mapper.Map<CandidateDto>(candidate);

        var matchRequest = new { vacancy = vacancyDto, candidate = candidateDto };

        double matchPercent = 0;
        try
        {
            var response = await _httpClient.PostAsJsonAsync("http://localhost:8000/match", matchRequest, cancellationToken);
            if (response.IsSuccessStatusCode)
            {
                var matchResult = await response.Content.ReadFromJsonAsync<MatchResponse>(cancellationToken: cancellationToken);
                if (matchResult != null)
                    matchPercent = matchResult.MatchPercent ;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to call match service: {ex.Message}");
        }

        application.MatchPercent = matchPercent;

        // 🔹 6. Save application
        await _applicationRepository.CreateAsync(application);
        return Result.Ok();
    }

    private record MatchResponse(double MatchPercent);
}
