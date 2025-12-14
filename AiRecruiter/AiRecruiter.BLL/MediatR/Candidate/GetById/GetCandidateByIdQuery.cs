using AiRecruiter.BLL.DTO;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.GetById;

public record GetCandidateByIdQuery(int Id) : IRequest<Result<CandidateDto>>;