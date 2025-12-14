using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AiRecruiter.API.Requests;
using AiRecruiter.API.Results;
using AiRecruiter.DAL;
using AiRecruiter.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AiRecruiter.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : Controller
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, DataContext context,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register-candidate")]
    public async Task<IActionResult> RegisterCandidate([FromBody] RegisterCandidateRequest payload)
    {
        var existingUser = await _userManager.FindByEmailAsync(payload.Email);
        if (existingUser != null)
            return BadRequest("User with this email already exists.");

        var user = new User
        {
            UserName = payload.Email,
            Email = payload.Email,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        var result = await _userManager.CreateAsync(user, payload.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        if (!await _roleManager.RoleExistsAsync("Candidate"))
            await _roleManager.CreateAsync(new IdentityRole("Candidate"));
        
        await _userManager.AddToRoleAsync(user, "Candidate");
        
        var candidate = new Candidate
        {
            UserId = user.Id,
            FirstName = payload.FirstName,
            LastName = payload.LastName,
            Skills = payload.Skills ?? Enumerable.Empty<string>(),
            ExperienceYears = payload.ExperienceYears,
            Location = payload.Location,
            AboutMe = payload.AboutMe,
            Salary = payload.Salary
        };

        _context.Candidates.Add(candidate);
        await _context.SaveChangesAsync();

        var authResult = await GenerateJwtToken(user);
        return Ok(authResult);
    }

    [HttpPost("register-company")]
    public async Task<IActionResult> RegisterCompany([FromBody] RegisterCompanyRequest payload)
    {
        var existingUser = await _userManager.FindByEmailAsync(payload.Email);
        if (existingUser != null)
            return BadRequest("User with this email already exists.");

        var user = new User
        {
            UserName = payload.Email,
            Email = payload.Email,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        var result = await _userManager.CreateAsync(user, payload.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        if (!await _roleManager.RoleExistsAsync("Company"))
            await _roleManager.CreateAsync(new IdentityRole("Company"));

        await _userManager.AddToRoleAsync(user, "Company");

        var company = new Company
        {
            UserId = user.Id,
            Name = payload.Name,
            Description = payload.Description
        };

        _context.Companies.Add(company);
        await _context.SaveChangesAsync();

        var authResult = await GenerateJwtToken(user);
        return Ok(authResult);
    }
    
    [HttpPost("login-user")]
    public async Task<IActionResult> Login([FromBody] LoginRequest payload)
    {
        var user = await _userManager.FindByEmailAsync(payload.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, payload.Password))
            return Unauthorized("Invalid email or password.");

        var authResult = await GenerateJwtToken(user);
        return Ok(authResult);
    }
    
    private async Task<AuthResult> GenerateJwtToken(User user)
    {
        var authClaims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        
        var authSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));
        
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.UtcNow.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        
        var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
        var refreshToken = new RefreshToken()
        {
            JwtId = token.Id,
            IsRevoked = false,
            UserId = user.Id,
            AddedDate = DateTime.UtcNow,
            ExpiryDate = DateTime.UtcNow.AddMonths(6),
            Token = Guid.NewGuid().ToString()
        };
        
        await _context.RefreshTokens.AddAsync(refreshToken);
        await _context.SaveChangesAsync();
        
        var response = new AuthResult
        {
            Token = jwtToken,
            RefreshToken = refreshToken.Token,
            ExpiresAt = token.ValidTo,
            Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? string.Empty
        };
        
        return response;
    }
}