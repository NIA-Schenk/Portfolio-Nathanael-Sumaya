using BeestjeOpJeFeestje.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BeestjeOpJeFeestje.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bug> Bugs { get; set; }
        public virtual DbSet<BugType> BugTypes { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<BookedBugs> BookedBugs { get; set; }
        public virtual DbSet<CustomerCard> CustomerCards { get; set; }
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Bug>(entity =>
            {
                entity.HasOne(bt => bt.bugType)
                .WithMany(b => b.Bugs)
                .HasForeignKey(b => b.BugTypeId);
            });

            modelBuilder.Entity<BookedBugs>(entity =>
            {
                entity.HasKey(bb => new { bb.BookingId, bb.BugId });

                entity.HasOne(b => b.bug)
                .WithMany(bb => bb.BookedBugs)
                .HasForeignKey(b => b.BugId);

                entity.HasOne(b => b.booking)
                .WithMany(bb => bb.BookedBugs)
                .HasForeignKey(b => b.BookingId);
            });

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.HasOne(cc => cc.customerCard)
                .WithMany(c => c.Users)
                .HasForeignKey(cc => cc.CustomerCardId);
            });


            modelBuilder.Entity<BugType>().HasData(
                new BugType { Id = 1, Name = "Jungle" },
                new BugType { Id = 2, Name = "Boerderij" },
                new BugType { Id = 3, Name = "Sneeuw" },
                new BugType { Id = 4, Name = "Woestijn" },
                new BugType { Id = 5, Name = "VIP" }
             );

            modelBuilder.Entity<Bug>().HasData(
                new Bug { Id = 1, Name = "Aap", BugTypeId = 1, Price = 50, Picture = "VoorbeeldURL1" },
                new Bug { Id = 2, Name = "Olifant", BugTypeId = 1, Price = 85, Picture = "VoorbeeldURL2" },
                new Bug { Id = 3, Name = "Zebra", BugTypeId = 1, Price = 40, Picture = "VoorbeeldURL3" },
                new Bug { Id = 4, Name = "Leeuw", BugTypeId = 1, Price = 90, Picture = "VoorbeeldURL4" },
                new Bug { Id = 5, Name = "Hond", BugTypeId = 2, Price = 120, Picture = "VoorbeeldURL5" },
                new Bug { Id = 6, Name = "Ezel", BugTypeId = 2, Price = 100, Picture = "VoorbeeldURL6" },
                new Bug { Id = 7, Name = "Koe", BugTypeId = 2, Price = 150, Picture = "VoorbeeldURL7" },
                new Bug { Id = 8, Name = "Eend", BugTypeId = 2, Price = 30, Picture = "VoorbeeldURL8" },
                new Bug { Id = 9, Name = "Kuiken", BugTypeId = 2, Price = 30, Picture = "VoorbeeldURL9" },
                new Bug { Id = 10, Name = "Pinguïn", BugTypeId = 3, Price = 200, Picture = "VoorbeeldURL10" },
                new Bug { Id = 11, Name = "Ijsbeer", BugTypeId = 3, Price = 250, Picture = "VoorbeeldURL11" },
                new Bug { Id = 12, Name = "Zeehond", BugTypeId = 3, Price = 160, Picture = "VoorbeeldURl12" },
                new Bug { Id = 13, Name = "Kameel", BugTypeId = 4, Price = 300, Picture = "VoorbeeldURL13" },
                new Bug { Id = 14, Name = "Slang", BugTypeId = 4, Price = 550, Picture = "VoorbeeldURL14" },
                new Bug { Id = 15, Name = "T-Rex", BugTypeId = 5, Price = 640, Picture = "VoorbeeldURL15" },
                new Bug { Id = 16, Name = "Unicorn", BugTypeId = 5, Price = 780, Picture = "VoorbeeldURL16" }
            );

            modelBuilder.Entity<CustomerCard>().HasData(
                new CustomerCard { Id = 1, Type = "Goud" },
                new CustomerCard { Id = 2, Type = "Zilver" },
                new CustomerCard { Id = 3, Type = "Platina" }
            );
        }

    }
}