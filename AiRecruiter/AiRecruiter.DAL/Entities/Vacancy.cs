using System.ComponentModel.DataAnnotations;
using System.Net.Mime;
using AiRecruiter.DAL.Enums;

namespace AiRecruiter.DAL.Entities;

public class Vacancy
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;
    public IEnumerable<string> Stack { get; set; } = Enumerable.Empty<string>();
    public Level Level { get; set; } = Level.Junior;
    [MaxLength(50)]
    public string Location { get; set; } = string.Empty;
    public decimal? Salary { get; set; }
    [MinLength(150)]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;
    public int MinMatchPercent { get; set; } = 70;
    public int MaxCandidates { get; set; } = 10;

    // Navigation
    public int CompanyId { get; set; } 
    public Company Company { get; set; }
    public ICollection<Application>? Applications { get; set; } = new List<Application>();
}