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

namespace AiRecruiter.BLL.MediatR.Vacancy.Create;

public class CreateVacancyHandler : IRequestHandler<CreateVacancyCommand, Result<Unit>>
{
    private readonly IVacancyRepository _vacancyRepository;
    private readonly ICompanyRepository _companyRepository;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<User> _userManager;

    public CreateVacancyHandler(
        IVacancyRepository vacancyRepository,
        ICompanyRepository companyRepository,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager)
    {
        _vacancyRepository = vacancyRepository;
        _companyRepository = companyRepository;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<Result<Unit>> Handle(CreateVacancyCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Result.Fail("Unauthorized user.");

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Result.Fail("User not found.");
        
        var roles = await _userManager.GetRolesAsync(user);
        if (!roles.Contains("Company"))
            return Result.Fail("Only companies can create vacancies.");
        
        var company = await _companyRepository.Query()
            .FirstOrDefaultAsync(c => c.UserId == user.Id, cancellationToken);
        if (company == null)
            return Result.Fail("Company profile not found for this user.");

        var vacancy = _mapper.Map<DAL.Entities.Vacancy>(request.Vacancy);
        if (vacancy == null)
            return Result.Fail("Vacancy data is invalid.");

        vacancy.CompanyId = company.Id;
        
        await _vacancyRepository.CreateAsync(vacancy);

        return Result.Ok();
    }
}
