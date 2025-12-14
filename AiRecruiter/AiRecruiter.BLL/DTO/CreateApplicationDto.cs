using AiRecruiter.DAL.Enums;

namespace AiRecruiter.BLL.DTO;

public class CreateApplicationDto
{
    public int VacancyId { get; set; }
    public int CandidateId { get; set; }
    public Status? Status { get; set; }
}