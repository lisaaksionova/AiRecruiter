using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.Update;

public record UpdateCandidateCommand(UpdateCandidateDto Candidate) : IRequest<Result<Unit>>;