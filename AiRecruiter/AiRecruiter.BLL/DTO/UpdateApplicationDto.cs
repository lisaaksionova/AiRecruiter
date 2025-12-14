using AiRecruiter.DAL.Enums;

namespace AiRecruiter.BLL.DTO;

public class UpdateApplicationDto
{
    public int Id { get; set; }
    public Status Status { get; set; }
}