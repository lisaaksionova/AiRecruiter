using AiRecruiter.BLL.DTO;
using AiRecruiter.BLL.Helpers;
using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Candidate.GetAll;

public record GetAllCandidateQuery(CandidateQueryRequest? query) : IRequest<Result<IEnumerable<CandidateDto>>>;