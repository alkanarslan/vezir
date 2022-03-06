using System.Linq.Expressions;
using vezir.api.Helper;

namespace vezir.api.GenericRepository;

public interface IGenericRepository<T> where T : class
{
    T GetById(int id);
    Task<int> GetCountAsync();
    Task<List<T>> ToFilterListAsync(PaginationFilter paginationFilter);
    IEnumerable<T> GetAll();
    IEnumerable<T> Find(Expression<Func<T, bool>> expression);
    Task<List<T>> FindAsync(Expression<Func<T, bool>> expression);
    
    void Add(T entity);
    void AddAsync(T entity);
    void AddRange(IEnumerable<T> entities);
    void Remove(T entity);
    void RemoveRange(IEnumerable<T> entities);
    void Edit(T entity);
    Task SaveChangesAsync();
    Task<List<T>> ToListAsync(Expression<Func<T, bool>> predicate);
    T FindOne(Expression<Func<T, bool>> predicate);
    Task ItemAny(Expression<Func<T, bool>> predicate);
}