using BeestjeOpJeFeestje.Data;
using BeestjeOpJeFeestje.Models;
using Microsoft.EntityFrameworkCore;

namespace BeestjeOpJeFeestje.Repositories
{
    public class BookingRepository : IBookingRepository
    {

        private readonly ApplicationDbContext dbContext;

        public BookingRepository(ApplicationDbContext _context)
        {
            dbContext = _context;
        }

        public async Task CreateBooking(Booking booking)
        {
            dbContext.Bookings.Add(booking);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteBooking(Booking booking)
        {
            dbContext.Bookings.Remove(booking);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<Booking>> GetAllBookings(string userId)
        {
            return await dbContext.Bookings
                .Where(i => i.UserId == userId)
                .Include(b => b.BookedBugs)
                .Include(b => b.User)
                .ToListAsync();
        }

        public async Task<Booking?> GetBookingById(int id)
        {
            return await dbContext.Bookings
                 .Include(b => b.BookedBugs)
                 .ThenInclude(b => b.bug)
                 .Include(b => b.User)
                 .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task UpdateBooking(Booking booking)
        {
            var existingBooking = await dbContext.Bookings
                .Include(b => b.BookedBugs) 
                .FirstOrDefaultAsync(b => b.Id == booking.Id);

            if (existingBooking != null)
            {
                existingBooking.Date = booking.Date;
                existingBooking.Name = booking.Name;
                existingBooking.Address = booking.Address;
                existingBooking.Email = booking.Email;
                existingBooking.PhoneNumber = booking.PhoneNumber;

                existingBooking.BookedBugs = booking.BookedBugs;

                await dbContext.SaveChangesAsync();
            }
        }
    }
}
