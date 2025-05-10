using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.Pkcs;

namespace BeestjeOpJeFeestje.Models
{
    public class Booking
    {
        [Key]
        [Range(0, int.MaxValue)]
        public int Id { get; set; }

        [DisplayName("Datum")]
        public required DateOnly Date { get; set; }

        [DisplayName("Naam")]
        public required string Name { get; set; }

        [DisplayName("Addres")]
        public required string Address { get; set; }

        [DisplayName("Emailaddress")]
        public string? Email { get; set; }

        [DisplayName("Telefoonnummer")]
        public string? PhoneNumber { get; set; }

        public string? UserId { get; set; } 

        public ApplicationUser? User { get; set; }

        public ICollection<BookedBugs>? BookedBugs { get; set; }


    }
}
