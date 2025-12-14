using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Vacancy.GetById;

public record GetVacancyByIdQuery(int Id) : IRequest<Result<VacancyDto>>;