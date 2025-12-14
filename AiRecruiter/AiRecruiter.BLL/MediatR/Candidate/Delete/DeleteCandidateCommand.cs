using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.Delete;

public record DeleteCandidateCommand(int Id) : IRequest<Result<Unit>>;