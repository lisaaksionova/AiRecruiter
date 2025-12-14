using System.ComponentModel.DataAnnotations;

namespace AiRecruiter.DAL.Entities;

public class Candidate
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;
    public IEnumerable<string> Skills { get; set; } = Enumerable.Empty<string>();
    public int ExperienceYears { get; set; }
    [MaxLength(50)]
    public string Location { get; set; } = string.Empty;
    
    [MaxLength(1000)]
    public string AboutMe { get; set; } = string.Empty;
    
    public decimal Salary { get; set; }

    public ICollection<Application>? Applications { get; set; } = new List<Application>();
    
    // Foreign key to the user
    public string UserId { get; set; }
    public virtual User User { get; set; }
}