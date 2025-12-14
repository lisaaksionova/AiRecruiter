using AiRecruiter.DAL.Enums;

namespace AiRecruiter.BLL.DTO;

public class VacancyDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public List<string> Stack { get; set; }
    public Level Level { get; set; }
    public string Location { get; set; }
    public decimal? Salary { get; set; }
    public string Description { get; set; }
    public int MinMatchPercent { get; set; }
    public int MaxCandidates { get; set; }
    public int CompanyId { get; set; }
}