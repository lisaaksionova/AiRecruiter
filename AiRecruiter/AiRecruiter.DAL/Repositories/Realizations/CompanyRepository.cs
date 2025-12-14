
using AiRecruiter.DAL.Entities;
using AiRecruiter.DAL.Repositories.Interfaces;

namespace AiRecruiter.DAL.Repositories.Realizations;

public class CompanyRepository(IQueryRepository<Company> repository) : ICompanyRepository
{
    public Company? GetById(int id)
    {
        return repository.GetById(id);
    }

    public async Task<Company?> GetByIdAsync(int id)
    {
        return await repository.GetByIdAsync(id);
    }

    public IEnumerable<Company>? GetAll()
    {
        return repository.GetAll();
    }

    public async Task<IEnumerable<Company>>? GetAllAsync()
    {
        return await repository.GetAllAsync();
    }

    public async Task Delete(Company entity)
    {
        await repository.Delete(entity);
    }

    public void Create(Company entity)
    {
        repository.Create(entity);
    }

    public async Task CreateAsync(Company entity)
    {
        await repository.CreateAsync(entity);
    }

    public async Task Update(Company entity)
    {
        await repository.Update(entity);
    }
    
    public IQueryable<Company> Query()
    {
        return repository.Query();
    }
}