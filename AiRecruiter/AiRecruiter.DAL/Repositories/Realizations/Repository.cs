
using AiRecruiter.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AiRecruiter.DAL.Repositories.Realizations;

public class Repository<T>(DataContext context) : IRepository<T>
    where T : class
{
    public void Create(T entity)
    {
        context.Set<T>().Add(entity);
        context.SaveChanges();
    }

    public async Task CreateAsync(T entity)
    {
        await context.Set<T>().AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task Update(T entity)
    {
        context.Set<T>().Update(entity);
        await context.SaveChangesAsync();
    }


    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await context.Set<T>()
            .OrderBy(e => EF.Property<int>(e, "Id"))
            .ToListAsync();

    }

    public async Task Delete(T entity)
    {
        context.Remove(entity);
        await context.SaveChangesAsync();
    }

    public T? GetById(int id)
    {
        return context.Set<T>().Find(id);
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await context.Set<T>().FindAsync(id);
    }

    public IEnumerable<T> GetAll()
    {
        return context.Set<T>().ToList();
    }
}