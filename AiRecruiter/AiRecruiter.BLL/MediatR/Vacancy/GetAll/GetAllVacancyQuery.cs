// csharp
using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.Helpers;
using FluentResults;
using MediatR;
using System.Collections.Generic;

namespace AiRecruiter.BLL.MediatR.Vacancy.GetAll;

public record GetAllVacancyQuery(VacancyQueryRequest? query) : IRequest<Result<IEnumerable<VacancyDto>>>;