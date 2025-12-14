using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Vacancy.Delete;

public class DeleteVacancyHandler(IVacancyRepository repository, IMapper mapper)
    : IRequestHandler<DeleteVacancyCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle(DeleteVacancyCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var toDelete = await repository.GetByIdAsync(id);

        if (toDelete is null)
            return Result.Fail("Vacancy not found");
        
        await repository.Delete(toDelete);
        return Result.Ok();
    }
}