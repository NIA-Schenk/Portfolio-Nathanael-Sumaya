using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Repositories
{
    public interface IBookingRepository
    {
        public Task<Booking?> GetBookingById(int id);

        public Task CreateBooking(Booking booking);

        public Task UpdateBooking(Booking booking);

        public Task DeleteBooking(Booking booking);

        public Task<List<Booking>> GetAllBookings(string userId);
    }
}
