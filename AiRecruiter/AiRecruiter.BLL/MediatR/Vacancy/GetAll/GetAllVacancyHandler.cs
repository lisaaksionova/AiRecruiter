using System.Security.Claims;
using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.Helpers;
using AiRecruiter.BLL.MediatR.Vacancy.GetAll;
using AiRecruiter.DAL.Entities;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class GetAllVacancyHandler : IRequestHandler<GetAllVacancyQuery, Result<IEnumerable<VacancyDto>>>
{
    private readonly IVacancyRepository _repository;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ICompanyRepository _companyRepository;

    public GetAllVacancyHandler(
        IVacancyRepository repository,
        IMapper mapper,
        UserManager<User> userManager,
        IHttpContextAccessor httpContextAccessor,
        ICompanyRepository companyRepository)
    {
        _repository = repository;
        _mapper = mapper;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
        _companyRepository = companyRepository;
    }

    public async Task<Result<IEnumerable<VacancyDto>>> Handle(GetAllVacancyQuery request, CancellationToken cancellationToken)
    {
        var user = await GetCurrentUserAsync();
        if (user == null)
            return Result.Fail("Unauthorized.");

        var roles = await _userManager.GetRolesAsync(user);

        var query = _repository.Query().AsQueryable();

        if (roles.Contains("Company"))
        {
            var company = await _companyRepository
                .Query()
                .FirstOrDefaultAsync(c => c.UserId == user.Id, cancellationToken);

            if (company == null)
                return Result.Fail("Company profile not found for this user.");

            query = query.Where(v => v.CompanyId == company.Id);
        }

        query = ApplyFilters(query, request.query);

        var vacancies = await query.ToListAsync(cancellationToken);
        if (!vacancies.Any())
            return Result.Fail("No vacancies found.");

        var vacancyDtos = _mapper.Map<IEnumerable<VacancyDto>>(vacancies);
        return Result.Ok(vacancyDtos);
    }

    private async Task<User?> GetCurrentUserAsync()
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return null;

        return await _userManager.FindByIdAsync(userId);
    }

    private static IQueryable<Vacancy> ApplyFilters(IQueryable<Vacancy> query, VacancyQueryRequest? filter)
    {
        if (filter == null)
            return query;

        if (filter.Stack != null && filter.Stack.Any())
        {
            query = query.Where(v => v.Stack.Any(s => filter.Stack.Contains(s)));
        }

        if (filter.Level.HasValue)
        {
            query = query.Where(v => v.Level == filter.Level.Value);
        }

        if (!string.IsNullOrWhiteSpace(filter.Location))
        {
            var pattern = $"%{filter.Location}%";
            query = query.Where(v => EF.Functions.Like(v.Location, pattern));
        }

        if (filter.Salary.HasValue)
        {
            query = query.Where(v => v.Salary >= filter.Salary.Value);
        }

        return query;
    }
}
