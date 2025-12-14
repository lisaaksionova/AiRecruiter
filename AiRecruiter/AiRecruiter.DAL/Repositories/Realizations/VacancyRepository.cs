
using AiRecruiter.DAL.Entities;
using AiRecruiter.DAL.Repositories.Interfaces;

namespace AiRecruiter.BLL.Services;

public class VacancyRepository(IQueryRepository<Vacancy> repository) : IVacancyRepository
{
    public Vacancy? GetById(int id)
    {
        return repository.GetById(id);
    }

    public async Task<Vacancy?> GetByIdAsync(int id)
    {
        return await repository.GetByIdAsync(id);
    }

    public IEnumerable<Vacancy>? GetAll()
    {
        return repository.GetAll();
    }

    public async Task<IEnumerable<Vacancy>>? GetAllAsync()
    {
        return await repository.GetAllAsync();
    }

    public async Task Delete(Vacancy entity)
    {
        await repository.Delete(entity);
    }

    public void Create(Vacancy entity)
    {
        repository.Create(entity);
    }

    public async Task CreateAsync(Vacancy entity)
    {
        await repository.CreateAsync(entity);
    }

    public async Task Update(Vacancy entity)
    {
        await repository.Update(entity);
    }

    public IQueryable<Vacancy> Query()
    {
        return repository.Query();
    }
}