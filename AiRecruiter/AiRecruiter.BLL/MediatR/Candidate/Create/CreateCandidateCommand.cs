
using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.Create;

public record CreateCandidateCommand(CreateCandidateDto Candidate) : IRequest<Result<Unit>>;