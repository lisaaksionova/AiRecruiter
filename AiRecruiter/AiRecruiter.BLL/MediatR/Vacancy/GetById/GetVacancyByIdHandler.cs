using AiRecruiter.BLL.DTO;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Vacancy.GetById;

public class GetVacancyByIdHandler(IVacancyRepository repository, IMapper mapper)
    : IRequestHandler<GetVacancyByIdQuery, Result<VacancyDto>>
{
    public async Task<Result<VacancyDto>> Handle(GetVacancyByIdQuery request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var vacancy = await repository.GetByIdAsync(id);
        var vacancyDto = mapper.Map<VacancyDto>(vacancy);
        
        return vacancyDto == null ? Result.Fail("Vacancy not found") : Result.Ok(vacancyDto);
    }
}