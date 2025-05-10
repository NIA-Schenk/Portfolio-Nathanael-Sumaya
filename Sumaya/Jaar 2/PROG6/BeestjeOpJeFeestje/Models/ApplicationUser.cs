namespace BeestjeOpJeFeestje.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;

    public class ApplicationUser : IdentityUser
    {
        public required string Name { get; set; }

        public string? Address { get; set; }

        [DisplayName("Klantenkaart")]
        [Range(1, int.MaxValue)]
        public int? CustomerCardId { get; set; }

        public CustomerCard? customerCard { get; set; }
    }
}
