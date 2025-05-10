using System.ComponentModel.DataAnnotations;
using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Viewmodels
{
    public class BookingVM
    {
        [Required(ErrorMessage = "Datum is verplicht.")]
        public DateOnly Date { get; set; }

        [Required(ErrorMessage = "Naam is verplicht.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Adres is verplicht.")]
        public string Address { get; set; }

        [EmailAddress(ErrorMessage = "Voer een geldig e-mailadres in.")]
        public string? Email { get; set; }

        [Phone(ErrorMessage = "Voer een geldig telefoonnummer in.")]
        public string? PhoneNumber { get; set; }

        public List<Bug> SelectedBugs { get; set; } = new();
    }
}
