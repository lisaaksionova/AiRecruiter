namespace AiRecruiter.DAL.Repositories.Interfaces;

public interface IRepository<T> where T : class
{
    T? GetById(int id);
    Task<T?> GetByIdAsync(int id);
    IEnumerable<T>? GetAll();
    Task<IEnumerable<T>>? GetAllAsync();
    Task Delete(T entity);
    void Create(T entity);
    Task CreateAsync(T entity);
    Task Update(T entity);
}