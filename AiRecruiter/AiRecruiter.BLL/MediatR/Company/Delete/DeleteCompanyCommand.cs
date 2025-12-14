using FluentResults;
using MediatR;

namespace AiRecruiter.BLL.MediatR.Company.Delete;

public record DeleteCompanyCommand(int Id) : IRequest<Result<Unit>>;