using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Vacancy.Delete;

public record DeleteVacancyCommand(int Id) : IRequest<Result<Unit>>;