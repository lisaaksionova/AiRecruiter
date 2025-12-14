using AiRecruiter.DAL.Entities;
using AiRecruiter.DAL.Repositories.Interfaces;

namespace AiRecruiter.DAL.Repositories.Realizations;

public class ApplicationRepository(IQueryRepository<Application> repository) : IApplicationRepository
{
    public Application? GetById(int id)
    {
        return repository.GetById(id);
    }

    public async Task<Application?> GetByIdAsync(int id)
    {
        return await repository.GetByIdAsync(id);
    }

    public IEnumerable<Application> GetAll()
    {
        return repository.GetAll();
    }

    public async Task<IEnumerable<Application>> GetAllAsync()
    {
        return await repository.GetAllAsync();
    }

    public async Task Delete(Application entity)
    {
        await repository.Delete(entity);
    }

    public void Create(Application entity)
    {
        repository.Create(entity);
    }

    public async Task CreateAsync(Application entity)
    {
        await repository.CreateAsync(entity);
    }

    public async Task Update(Application entity)
    {
        await repository.Update(entity);
    }

    public IQueryable<Application> Query()
    {
        return repository.Query();
    }
}