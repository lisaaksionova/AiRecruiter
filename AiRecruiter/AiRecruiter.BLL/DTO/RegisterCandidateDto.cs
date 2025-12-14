namespace AiRecruiter.BLL.DTO;

public class RegisterCandidateDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Location { get; set; }
    public int ExperienceYears { get; set; }
    public List<string> Skills { get; set; }
}