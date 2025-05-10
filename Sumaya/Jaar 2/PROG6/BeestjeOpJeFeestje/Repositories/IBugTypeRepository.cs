using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Repositories
{
    public interface IBugTypeRepository
    {
        public Task<List<BugType>> GetAllBugTypes();

        public Task<List<Bug>> GetAllBugsWithBugTypes();

        public Task<Bug?> GetBugWithBugTypes(int id);

    }
}
