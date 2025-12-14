using AiRecruiter.BLL.DTO;
using AutoMapper;

namespace AiRecruiter.BLL.Mapper.Vacancy;

public class VacancyProfile : Profile
{
    public VacancyProfile()
    {
        CreateMap<DAL.Entities.Vacancy, VacancyDto>().ReverseMap();
        CreateMap<VacancyDto, UpdateVacancyDto>().ReverseMap();
        CreateMap<CreateVacancyDto, DAL.Entities.Vacancy>().ReverseMap();
    }
}