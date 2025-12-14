using AiRecruiter.DAL.Enums;

namespace AiRecruiter.BLL.DTO;

public class ApplicationDto
{
    public int Id { get; set; }
    public DateTime AppliedAt { get; set; }
    public Status Status { get; set; }
    public double MatchPercent { get; set; }
    public int VacancyId { get; set; }
    public int CandidateId { get; set; }
}