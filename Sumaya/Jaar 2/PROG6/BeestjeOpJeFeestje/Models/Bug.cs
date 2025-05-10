using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BeestjeOpJeFeestje.Models
{
    public class Bug
    {
        [Key]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }

        [StringLength(50)]
        [DisplayName("Naam")]
        public required string Name { get; set; }

        public BugType bugType { get; set; }

        [Range(1, int.MaxValue)]
        public required int BugTypeId { get; set; }

        [Range (1, int.MaxValue)]
        [DisplayName("Prijs")]
        public required int Price { get; set; }

        [StringLength(500)]
        [DisplayName("Foto")]
        public string? Picture { get; set; }

        public ICollection<BookedBugs>? BookedBugs { get; set; }
    }
}
