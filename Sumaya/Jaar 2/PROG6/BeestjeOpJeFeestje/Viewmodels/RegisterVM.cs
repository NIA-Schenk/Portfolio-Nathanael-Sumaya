using System.ComponentModel.DataAnnotations;
using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Viewmodels
{
    public class RegisterVM
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is verplicht")]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Het wachtwoord en het bevestigingswachtwoord komen niet overeen.")]
        public string ConfirmPassword { get; set; }

        public string? Name { get; set; }

        public string? Address { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        public string SelectedRole { get; set; }

        public int? SelectedCustomerCardId { get; set; }

        public List<string> AvailableRoles { get; set; } = new List<string>();

        public ICollection<CustomerCard> customerCards { get; set; }

    }
}
