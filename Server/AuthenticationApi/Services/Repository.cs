using AuthenticationApi.Db;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AuthenticationApi.Services
{
    public class Repository<T>: IRepository<T> where T : class
    {
        protected AppDbContext _appDbContext { get; set; }
        public Repository(AppDbContext appDbContext)
        {
        _appDbContext = appDbContext;
        }
        public IQueryable<T> FindAll() => _appDbContext.Set<T>().AsNoTracking();
        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) =>
            _appDbContext.Set<T>().Where(expression).AsNoTracking();
        public void Create(T entity) => _appDbContext.Set<T>().Add(entity);
        public void Update(T entity) => _appDbContext.Set<T>().Update(entity);
        public void Delete(T entity) => _appDbContext.Set<T>().Remove(entity);

    }
}
