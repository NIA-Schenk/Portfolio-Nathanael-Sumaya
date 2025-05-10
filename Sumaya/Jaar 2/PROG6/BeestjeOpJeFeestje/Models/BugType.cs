using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BeestjeOpJeFeestje.Models
{
    public class BugType
    {
        [Key]
        [Range(0, int.MaxValue)]
        public int Id { get; set; }

        [StringLength(50)]
        [DisplayName("Naam")]
        public required string Name { get; set; }

        public ICollection<Bug> Bugs { get; set; }
    }
}
