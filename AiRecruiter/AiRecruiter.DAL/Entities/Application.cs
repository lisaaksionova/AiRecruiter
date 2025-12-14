using System.ComponentModel.DataAnnotations;
using AiRecruiter.DAL.Enums;

namespace AiRecruiter.DAL.Entities;

public class Application
{
    [Key]
    public int Id { get; set; }
    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    public double MatchPercent { get; set; } // % відповідності (результат ML)

    public Status Status { get; set; } = Status.Applied; // Статус заявки (Новий, В процесі, Прийнятий, Відхилений)
    // Навігаційні властивості
    public int VacancyId { get; set; }
    public int CandidateId { get; set; }
    public Vacancy Vacancy { get; set; }
    public Candidate Candidate { get; set; }
}