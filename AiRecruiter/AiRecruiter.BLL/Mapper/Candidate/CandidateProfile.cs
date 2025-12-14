using AiRecruiter.BLL.DTO;
using AutoMapper;

namespace AiRecruiter.BLL.Mapper.Candidate;

public class CandidateProfile: Profile
{
    public CandidateProfile()
    {
        CreateMap<DAL.Entities.Candidate, CandidateDto>().ReverseMap();
        CreateMap<CandidateDto, UpdateCandidateDto>().ReverseMap();
        CreateMap<CreateCandidateDto, DAL.Entities.Candidate>().ReverseMap();
    }
}