using AiRecruiter.BLL.DTO;
using AutoMapper;

namespace AiRecruiter.BLL.Mapper.Company;

public class CompanyProfile : Profile
{
    public CompanyProfile()
    {
        CreateMap<DAL.Entities.Company, CompanyDto>().ReverseMap();
        CreateMap<CompanyDto, UpdateCompanyDto>().ReverseMap();
        CreateMap<CreateCompanyDto, DAL.Entities.Company>().ReverseMap();
    }
}