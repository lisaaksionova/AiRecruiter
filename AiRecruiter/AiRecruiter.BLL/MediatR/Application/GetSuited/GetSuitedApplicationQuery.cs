using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Application.GetSuited;

public record GetSuitedApplicationQuery(VacancyDto Vacancy) : IRequest<Result<IEnumerable<ApplicationDto>>>;