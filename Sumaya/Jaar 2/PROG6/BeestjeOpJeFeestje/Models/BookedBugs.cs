using System.ComponentModel;

namespace BeestjeOpJeFeestje.Models
{
    public class BookedBugs
    {
        public required DateOnly BookingDate { get; set; }

        public required int BugId { get; set; }
        public Bug bug { get; set; }

        public required int BookingId { get; set; }

        public Booking booking { get; set; }

        [DisplayName("discount")]
        public double? discount { get; set; }

        [DisplayName("totale prijs")]
        public double? totalPrice { get; set; }
    }
}
