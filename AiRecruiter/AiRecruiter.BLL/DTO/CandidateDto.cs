namespace AiRecruiter.BLL.DTO;

public class CandidateDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Location { get; set; }
    public int ExperienceYears { get; set; }
    public List<string> Skills { get; set; }
}