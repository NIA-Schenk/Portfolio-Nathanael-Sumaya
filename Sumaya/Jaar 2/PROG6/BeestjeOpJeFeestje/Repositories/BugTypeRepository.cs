using BeestjeOpJeFeestje.Data;
using BeestjeOpJeFeestje.Models;
using Microsoft.EntityFrameworkCore;

namespace BeestjeOpJeFeestje.Repositories
{
    public class BugTypeRepository : IBugTypeRepository
    {
        public readonly ApplicationDbContext dbContext;

        public BugTypeRepository(ApplicationDbContext _context)
        {
            dbContext = _context;
        }

        public Task<List<Bug>> GetAllBugsWithBugTypes()
        {
            return dbContext.Bugs.Include(bt => bt.bugType).ToListAsync();
        }

        public Task<List<BugType>> GetAllBugTypes()
        {
            return dbContext.BugTypes.ToListAsync();
        }

        public Task<Bug?> GetBugWithBugTypes(int id)
        {
            return dbContext.Bugs.Include(bt => bt.bugType).FirstOrDefaultAsync(i => i.Id == id);
        }
    }
}
