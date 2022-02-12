using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace vezir.api.GenericRepository;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly VezirApiContext Context;
    public GenericRepository(VezirApiContext context)
    {
        Context = context;
    }
    public void Add(T entity)
    {
        Context.Set<T>().Add(entity);
    }
    public void AddRange(IEnumerable<T> entities)
    {
        Context.Set<T>().AddRange(entities);
    }
    public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
    {
        return Context.Set<T>().Where(expression);
    }
    public IEnumerable<T> GetAll()
    {
        return Context.Set<T>().ToList();
    }
    public T GetById(int id)
    {
        return Context.Set<T>().Find(id);
    }
    public void Remove(T entity)
    {
        Context.Set<T>().Remove(entity);
    }
    public void RemoveRange(IEnumerable<T> entities)
    {
        Context.Set<T>().RemoveRange(entities);
    }
    public virtual void Edit(T entity)
    {
        Context.Entry(entity).State = EntityState.Modified;
    }
}