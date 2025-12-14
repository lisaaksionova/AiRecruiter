using System.ComponentModel.DataAnnotations;

namespace AiRecruiter.API.Requests;

public class RegisterCandidateRequest
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(6)]
    public string Password { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;

    public IEnumerable<string> Skills { get; set; } = new List<string>();

    [Range(0, 60, ErrorMessage = "Experience years must be between 0 and 60.")]
    public int ExperienceYears { get; set; }

    [MaxLength(50)]
    public string Location { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string AboutMe { get; set; } = string.Empty;

    [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive number.")]
    public decimal Salary { get; set; }
}