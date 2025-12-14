using AiRecruiter.DAL.Repositories.Interfaces;

namespace AiRecruiter.DAL.Repositories.Realizations;

public class QueryRepository<T>(DataContext context) : Repository<T>(context), IQueryRepository<T>
    where T : class
{
    public IQueryable<T> Query()
    {
        return context.Set<T>().AsQueryable();
    }
}