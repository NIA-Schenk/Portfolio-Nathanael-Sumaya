using BeestjeOpJeFeestje.Data;
using BeestjeOpJeFeestje.Models;
using BeestjeOpJeFeestje.Viewmodels;
using Microsoft.EntityFrameworkCore;

namespace BeestjeOpJeFeestje.Repositories
{
    public class BookedBugsRepository : IBookedBugsRepository
    {

        private readonly ApplicationDbContext dbContext;

        public BookedBugsRepository(ApplicationDbContext _context)
        {
            dbContext = _context;
        }

        public async Task CreateBooking(BookedBugs booking)
        {
            dbContext.BookedBugs.Add(booking);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteBooking(BookedBugs booking)
        {
            dbContext.BookedBugs.Remove(booking);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<BookedBugs>> GetAllBookings()
        {
            return await dbContext.BookedBugs
                .Include(b => b.booking)
                .Include(b => b.bug)
                .ToListAsync();
        }

        public async Task<List<Bug>> GetAvailableBugsByDate(DateOnly date)
        {
            var allBugs = await dbContext.Bugs.ToListAsync();

            var bookedBugIds = await dbContext.BookedBugs
                .Where(b => b.BookingDate == date)
                .Select(b => b.bug.Id) 
                .ToListAsync();

            var availableBugs = allBugs
                .Where(b => !bookedBugIds.Contains(b.Id))
                .ToList();

            return availableBugs;
        }


        public async Task<List<BookedBugs>> GetBookedBugsByDate(DateOnly date)
        {
            var bookedBugs = await dbContext.BookedBugs
                .Where(b => b.BookingDate == date)
                .Include(b => b.booking)
                .Include(b => b.bug)
                .ToListAsync();

            return bookedBugs;
        }

        public async Task<BookedBugs?> GetBookingById(int id)
        {
            return await dbContext.BookedBugs
                .Include(b => b.booking)
                .Include(b => b.bug)
                .ThenInclude(bt => bt.bugType)
                .FirstOrDefaultAsync(i => i.BookingId == id);
        }

        public async Task UpdateBooking(BookedBugs booking)
        {
            dbContext.BookedBugs.Update(booking);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<BookedBugs>> GetBookedBugsByBookingId(int bookingId)
        {
            return await dbContext.BookedBugs
                .Where(bb => bb.BookingId == bookingId)
                .Include(bb => bb.bug)
                .ThenInclude(b => b.bugType)
                .ToListAsync();
        }
    }
}
