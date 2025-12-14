namespace AiRecruiter.DAL.Repositories.Interfaces;

public interface IQueryRepository<T> : IRepository<T> where T : class
{
    IQueryable<T> Query();
}
