namespace AiRecruiter.BLL.Helpers;

public class CandidateQueryRequest
{
    public string? Location { get; set; }
    public List<string>? Skills { get; set; }
    public int? ExperienceYears { get; set; }
}