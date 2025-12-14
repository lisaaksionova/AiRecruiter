using AiRecruiter.DAL.Enums;

namespace AiRecruiter.BLL.Helpers;

public class VacancyQueryRequest
{
    public List<string>? Stack { get; set; } 
    public Level? Level { get; set; }
    public string? Location { get; set; }
    public decimal? Salary { get; set; }
}