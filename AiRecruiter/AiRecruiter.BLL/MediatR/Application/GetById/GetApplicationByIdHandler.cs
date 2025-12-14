using AiRecruiter.BLL.DTO;
using AiRecruiter.DAL.Repositories.Interfaces;
using AutoMapper;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.GetById;

public class GetApplicationByIdHandler(IApplicationRepository repository, IMapper mapper)
    : IRequestHandler<GetApplicationByIdQuery, Result<ApplicationDto>>
{
    public async Task<Result<ApplicationDto>> Handle(GetApplicationByIdQuery request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var application = await repository.GetByIdAsync(id);
        var applicationDto = mapper.Map<ApplicationDto>(application);
        
        return applicationDto == null ? Result.Fail("Application not found") : Result.Ok(applicationDto);
    }
}