﻿// <auto-generated />
using System;
using BeestjeOpJeFeestje.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BeestjeOpJeFeestje.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250416163329_UpdatedColumns")]
    partial class UpdatedColumns
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CustomerCardId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("CustomerCardId");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.BookedBugs", b =>
                {
                    b.Property<int>("BookingId")
                        .HasColumnType("int");

                    b.Property<int>("BugId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("BookingDate")
                        .HasColumnType("date");

                    b.Property<double?>("discount")
                        .HasColumnType("float");

                    b.Property<double?>("totalPrice")
                        .HasColumnType("float");

                    b.HasKey("BookingId", "BugId");

                    b.HasIndex("BugId");

                    b.ToTable("BookedBugs");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.Bug", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BugTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Picture")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BugTypeId");

                    b.ToTable("Bugs");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BugTypeId = 1,
                            Name = "Aap",
                            Picture = "VoorbeeldURL1",
                            Price = 50
                        },
                        new
                        {
                            Id = 2,
                            BugTypeId = 1,
                            Name = "Olifant",
                            Picture = "VoorbeeldURL2",
                            Price = 85
                        },
                        new
                        {
                            Id = 3,
                            BugTypeId = 1,
                            Name = "Zebra",
                            Picture = "VoorbeeldURL3",
                            Price = 40
                        },
                        new
                        {
                            Id = 4,
                            BugTypeId = 1,
                            Name = "Leeuw",
                            Picture = "VoorbeeldURL4",
                            Price = 90
                        },
                        new
                        {
                            Id = 5,
                            BugTypeId = 2,
                            Name = "Hond",
                            Picture = "VoorbeeldURL5",
                            Price = 120
                        },
                        new
                        {
                            Id = 6,
                            BugTypeId = 2,
                            Name = "Ezel",
                            Picture = "VoorbeeldURL6",
                            Price = 100
                        },
                        new
                        {
                            Id = 7,
                            BugTypeId = 2,
                            Name = "Koe",
                            Picture = "VoorbeeldURL7",
                            Price = 150
                        },
                        new
                        {
                            Id = 8,
                            BugTypeId = 2,
                            Name = "Eend",
                            Picture = "VoorbeeldURL8",
                            Price = 30
                        },
                        new
                        {
                            Id = 9,
                            BugTypeId = 2,
                            Name = "Kuiken",
                            Picture = "VoorbeeldURL9",
                            Price = 30
                        },
                        new
                        {
                            Id = 10,
                            BugTypeId = 3,
                            Name = "Pinguïn",
                            Picture = "VoorbeeldURL10",
                            Price = 200
                        },
                        new
                        {
                            Id = 11,
                            BugTypeId = 3,
                            Name = "Ijsbeer",
                            Picture = "VoorbeeldURL11",
                            Price = 250
                        },
                        new
                        {
                            Id = 12,
                            BugTypeId = 3,
                            Name = "Zeehond",
                            Picture = "VoorbeeldURl12",
                            Price = 160
                        },
                        new
                        {
                            Id = 13,
                            BugTypeId = 4,
                            Name = "Kameel",
                            Picture = "VoorbeeldURL13",
                            Price = 300
                        },
                        new
                        {
                            Id = 14,
                            BugTypeId = 4,
                            Name = "Slang",
                            Picture = "VoorbeeldURL14",
                            Price = 550
                        },
                        new
                        {
                            Id = 15,
                            BugTypeId = 5,
                            Name = "T-Rex",
                            Picture = "VoorbeeldURL15",
                            Price = 640
                        },
                        new
                        {
                            Id = 16,
                            BugTypeId = 5,
                            Name = "Unicorn",
                            Picture = "VoorbeeldURL16",
                            Price = 780
                        });
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.BugType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("BugTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Jungle"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Boerderij"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Sneeuw"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Woestijn"
                        },
                        new
                        {
                            Id = 5,
                            Name = "VIP"
                        });
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.CustomerCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CustomerCards");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Type = "Goud"
                        },
                        new
                        {
                            Id = 2,
                            Type = "Zilver"
                        },
                        new
                        {
                            Id = 3,
                            Type = "Platina"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.ApplicationUser", b =>
                {
                    b.HasOne("BeestjeOpJeFeestje.Models.CustomerCard", "customerCard")
                        .WithMany("Users")
                        .HasForeignKey("CustomerCardId");

                    b.Navigation("customerCard");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.BookedBugs", b =>
                {
                    b.HasOne("BeestjeOpJeFeestje.Models.Booking", "booking")
                        .WithMany("BookedBugs")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeestjeOpJeFeestje.Models.Bug", "bug")
                        .WithMany("BookedBugs")
                        .HasForeignKey("BugId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("booking");

                    b.Navigation("bug");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.Booking", b =>
                {
                    b.HasOne("BeestjeOpJeFeestje.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.Bug", b =>
                {
                    b.HasOne("BeestjeOpJeFeestje.Models.BugType", "bugType")
                        .WithMany("Bugs")
                        .HasForeignKey("BugTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("bugType");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("BeestjeOpJeFeestje.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("BeestjeOpJeFeestje.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeestjeOpJeFeestje.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("BeestjeOpJeFeestje.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.Booking", b =>
                {
                    b.Navigation("BookedBugs");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.Bug", b =>
                {
                    b.Navigation("BookedBugs");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.BugType", b =>
                {
                    b.Navigation("Bugs");
                });

            modelBuilder.Entity("BeestjeOpJeFeestje.Models.CustomerCard", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
