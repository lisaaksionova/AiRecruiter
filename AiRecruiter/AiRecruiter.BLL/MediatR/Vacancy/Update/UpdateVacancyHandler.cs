using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Vacancy.Update;

public class UpdateVacancyHandler(IVacancyRepository repository, IMapper mapper) :  IRequestHandler<UpdateVacancyCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(UpdateVacancyCommand request, CancellationToken cancellationToken)
    {
        var existingVacancy= await repository.GetByIdAsync(request.Vacancy.Id);
        if (existingVacancy == null)
            return Result.Fail("Vacancy not found");

        mapper.Map(request.Vacancy, existingVacancy);

        await repository.Update(existingVacancy);

        return Result.Ok();
    }
}