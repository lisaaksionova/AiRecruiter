using AiRecruiter.BLL.DTO;
using AutoMapper;
namespace AiRecruiter.BLL.Mapper.Application;

public class ApplicationProfile : Profile
{
    public ApplicationProfile()
    {
        CreateMap<DAL.Entities.Application, ApplicationDto>().ReverseMap();
        CreateMap<ApplicationDto, UpdateApplicationDto>().ReverseMap();
        CreateMap<CreateApplicationDto, DAL.Entities.Application>().ReverseMap();
    }
}