using System.ComponentModel.DataAnnotations;

namespace AiRecruiter.DAL.Entities;

public class Company
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;
    [Required]
    [MinLength(150)]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    public ICollection<Vacancy>? Vacancies { get; set; } = new List<Vacancy>();
    
    // Foreign key to the user
    public string UserId { get; set; }
    public virtual User User { get; set; }
}