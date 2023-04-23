namespace ShadowShareAPI.Core.Data.Base;

public interface IRepository<T> where T : class, IEntity
{
    Task<List<T>> GetAll();
    Task<T> Get(Guid id);
    Task Add(T entity);
    Task Delete(Guid id);
    Task Update(T entity);
}
