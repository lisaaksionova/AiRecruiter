using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Vacancy.Update;

public record UpdateVacancyCommand(UpdateVacancyDto Vacancy) : IRequest<Result<Unit>>;