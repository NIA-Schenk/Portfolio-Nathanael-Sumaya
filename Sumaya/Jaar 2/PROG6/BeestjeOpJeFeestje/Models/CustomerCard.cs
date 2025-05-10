using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace BeestjeOpJeFeestje.Models
{
    public class CustomerCard
    {
        [Key]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }

        public required string Type { get; set; }

        public ICollection<ApplicationUser> Users { get; set; }
    }

}
