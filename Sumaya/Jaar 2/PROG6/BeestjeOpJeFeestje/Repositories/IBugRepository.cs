using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Repositories
{
    public interface IBugRepository
    {

        public Task<List<Bug>> GetAllBugs();

        public Task <Bug?> GetBug(int id);

        public Task CreateBug(Bug bug);

        public Task UpdateBug(Bug bug);

        public Task DeleteBug(Bug bug);
    }
}
