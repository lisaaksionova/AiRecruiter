using AiRecruiter.DAL.Entities;
using AiRecruiter.DAL.Repositories.Interfaces;

namespace AiRecruiter.DAL.Repositories.Realizations;

public class CandidateRepository(IQueryRepository<Candidate> repository) : ICandidateRepository
{
    public Candidate? GetById(int id)
    {
        return repository.GetById(id);
    }

    public async Task<Candidate?> GetByIdAsync(int id)
    {
        return await repository.GetByIdAsync(id);
    }

    public IEnumerable<Candidate>? GetAll()
    {
        return repository.GetAll();
    }

    public async Task<IEnumerable<Candidate>>? GetAllAsync()
    {
        return await repository.GetAllAsync();
    }

    public async Task Delete(Candidate entity)
    {
        await repository.Delete(entity);
    }

    public void Create(Candidate entity)
    {
        repository.Create(entity);
    }

    public async Task CreateAsync(Candidate entity)
    {
        await repository.CreateAsync(entity);
    }

    public async Task Update(Candidate entity)
    {
        await repository.Update(entity);
    }
    
    public IQueryable<Candidate> Query()
    {
        return repository.Query();
    }
}