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

namespace AiRecruiter.BLL.MediatR.Application.GetAll;

public class GetAllApplicationHandler : IRequestHandler<GetAllApplicationQuery, Result<IEnumerable<ApplicationDto>>>
{
    private readonly IApplicationRepository _applicationRepository;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<User> _userManager;
    private readonly ICandidateRepository _candidateRepository;
    private readonly ICompanyRepository _companyRepository;

    public GetAllApplicationHandler(
        IApplicationRepository applicationRepository,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager,
        ICandidateRepository candidateRepository,
        ICompanyRepository companyRepository)
    {
        _applicationRepository = applicationRepository;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _candidateRepository = candidateRepository;
        _companyRepository = companyRepository;
    }

    public async Task<Result<IEnumerable<ApplicationDto>>> Handle(GetAllApplicationQuery request, CancellationToken cancellationToken)
    {
        // 🔹 1. Get current user
        var user = await GetCurrentUserAsync();
        if (user == null)
            return Result.Fail("Unauthorized.");

        var roles = await _userManager.GetRolesAsync(user);

        // 🔹 2. Build base query
        var query = _applicationRepository.Query()
            .Include(a => a.Vacancy)
            .Include(a => a.Candidate)
            .AsQueryable();

        // 🔹 3. Filter based on role
        if (roles.Contains("Company"))
        {
            var company = await _companyRepository
                .Query()
                .FirstOrDefaultAsync(c => c.UserId == user.Id, cancellationToken);

            if (company == null)
                return Result.Fail("Company profile not found for this user.");

            query = query.Where(a => a.Vacancy.CompanyId == company.Id);
        }
        else if (roles.Contains("Candidate"))
        {
            var candidate = await _candidateRepository
                .Query()
                .FirstOrDefaultAsync(c => c.UserId == user.Id, cancellationToken);

            if (candidate == null)
                return Result.Fail("Candidate profile not found for this user.");

            query = query.Where(a => a.CandidateId == candidate.Id);
        }

        // 🔹 4. Execute query
        var applications = await query.ToListAsync(cancellationToken);

        var applicationDtos = _mapper.Map<IEnumerable<ApplicationDto>>(applications);
        return Result.Ok(applicationDtos);
    }

    private async Task<User?> GetCurrentUserAsync()
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        return userId == null ? null : await _userManager.FindByIdAsync(userId);
    }
}
