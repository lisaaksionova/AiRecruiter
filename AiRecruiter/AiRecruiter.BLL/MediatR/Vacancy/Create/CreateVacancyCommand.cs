
using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Vacancy.Create;

public record CreateVacancyCommand(CreateVacancyDto Vacancy) : IRequest<Result<Unit>>;