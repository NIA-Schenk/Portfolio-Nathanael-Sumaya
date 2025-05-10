using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Repositories
{
    public interface IBookedBugsRepository
    {
        //TODO: methoden namen consistent maken 

        public Task<List<BookedBugs>> GetAllBookings ();

        public Task<BookedBugs?> GetBookingById(int id);

        public Task CreateBooking(BookedBugs booking);

        public Task UpdateBooking(BookedBugs booking);

        public Task DeleteBooking (BookedBugs booking);

        public Task<List<BookedBugs>> GetBookedBugsByDate(DateOnly date);

        public Task<List<Bug>> GetAvailableBugsByDate (DateOnly date);

        public Task<List<BookedBugs>> GetBookedBugsByBookingId(int bookingId);
    }
}
