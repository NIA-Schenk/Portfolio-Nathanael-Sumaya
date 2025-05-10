using BeestjeOpJeFeestje.Data;
using BeestjeOpJeFeestje.Models;
using Microsoft.EntityFrameworkCore;

namespace BeestjeOpJeFeestje.Repositories
{
    public class BugRepository : IBugRepository
    {

        private readonly ApplicationDbContext dbContext;

        public BugRepository(ApplicationDbContext _context)
        {
            dbContext = _context;
        }

        public async Task CreateBug(Bug bug)
        {
            dbContext.Bugs.Add(bug);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteBug(Bug bug)
        {
            dbContext.Bugs.Remove(bug);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<Bug>> GetAllBugs()
        {
            return await dbContext.Bugs
                .Include(bt => bt.bugType)
                .ToListAsync();
        }

        public async Task<Bug?> GetBug(int id)
        {
            return await dbContext.Bugs.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task UpdateBug(Bug bug)
        {
            dbContext.Bugs.Update(bug);
            await dbContext.SaveChangesAsync();
        }
    }
}
