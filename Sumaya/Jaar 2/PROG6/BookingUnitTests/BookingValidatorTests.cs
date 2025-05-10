using Moq;
using Xunit;
using BeestjeOpJeFeestje.Models;
using BeestjeOpJeFeestje.Services;
using System;
using System.Collections.Generic;
using BeestjeOpJeFeestje.Data;
using BeestjeOpJeFeestje.Migrations;

namespace BeestjeOpJeFeestje.Tests
{
    public class BugServiceTests
    {
        private readonly BookingValidator _bookingValidator;

        // Constructor
        public BugServiceTests()
        {
            _bookingValidator = new BookingValidator(); 
        }

        // Validatie Regels

        [Fact]
        public void ValidateBookingRules_ShouldReturnError_WhenFarmAndLionCombined()
        {
            // Arrange
            var bugs = new List<Bug>
            {
                new () { Name = "Koe", BugTypeId = 2 , Price = 100, bugType = new BugType { Id = 2, Name = "Boerderij" } }, 
                new () { Name = "Leeuw", BugTypeId = 1 , Price = 80, bugType = new BugType { Id = 2, Name = "Jungle" } }, 
            }; 
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 4, 11); // normale doordeweekse dag

            // Act 
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert 
            Assert.Contains("Je kunt geen boerderijdier combineren met een Jungle- of Sneeuwdier. Nom nom nom!", result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldReturnError_WhenFarmAndPolarBearCombined()
        {
            // Arrange
            var bugs = new List<Bug>
            {
                new () { Name = "Koe", BugTypeId = 2 , Price = 100, bugType = new BugType { Id = 2, Name = "Boerderij" } },
                new () { Name = "IJsbeer", BugTypeId = 3 , Price = 60, bugType = new BugType { Id = 3, Name = "Sneeuw" } }, 
            };
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 4, 11); // normale doordeweekse dag

            // Act 
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert 
            Assert.Contains("Je kunt geen boerderijdier combineren met een Jungle- of Sneeuwdier. Nom nom nom!", result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldReturnError_WhenPenguinBookedOnWeekend()
        {
            // Arrange 
            var bugs = new List<Bug> { new() { Name = "Pinguïn", BugTypeId = 3, Price = 20, bugType = new BugType { Id = 3, Name = "Sneeuw" } } };
            var user = new ApplicationUser { Name = "Sumaya" };
            var weekendDate = new DateOnly(2025, 4, 12); // zaterdag

            // Act 
            var result = _bookingValidator.ValidateBookingRules(bugs, weekendDate, user);

            // Assert
            Assert.Contains("Pinguïns kunnen alleen doordeweeks geboekt worden. Dieren in pak werken alleen doordeweeks!", result);
        }


        //// Korting Regels

        [Fact]
        public void CalculateBookingDiscount_ShouldApplyDiscountFor3SameType()
        {
            // Arrange
            var bugs = new List<Bug>  
            { 
                new () { Name = "Tijger", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Beer", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Spin", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
            };
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 4, 11); // normale doordeweekse dag

            // Act 
            var discount = _bookingValidator.CalculateBookingDiscount(bugs, date, user);

            // Assert
            Assert.Equal(10, discount);
        }

        [Fact]
        public void CalculateBookingDiscount_ShouldApplyDiscountForEend()
        {
            // Arrange
            var bugs = new List<Bug> { new() { Name = "Eend", BugTypeId = 2, Price = 50, bugType = new BugType { Id = 2, Name = "Boerderij" } } }; 
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 4, 11);

            // Act
            var discount = _bookingValidator.CalculateBookingDiscount(bugs, date, user);

            // Assert
            Assert.InRange(discount, 0, 50);
        }

        [Fact]
        public void CalculateBookingDiscount_ShouldNotExceed60Percent()
        {
            // Arrange 
            var bugs = new List<Bug> 
            {
                new () { Name = "Aap", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Cobra", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "abcdefghi", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
            };
            var user = new ApplicationUser { Name = "Sumaya", customerCard = new CustomerCard { Id = 1, Type = "Gold" } };
            var date = new DateOnly(2025, 4, 6); // Maandag

            // Act
            var discount = _bookingValidator.CalculateBookingDiscount(bugs, date, user); // zou officieel 61 procent moeten zijn

            // Assert
            Assert.True(discount <= 60);
        }

        [Fact]
        public void CalculateTotal_ShouldReturnCorrectTotalAfterDiscount()
        {
            // Arrange 
            var bugs = new List<Bug>
            {
                new () { Name = "Aap", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Beer", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
            };
            double discount = 10;

            // Act 
            var total = _bookingValidator.CalculateTotal(bugs, discount);

            // Assert
            Assert.Equal(90, total);
        }

        [Fact]
        public void ValidateBookingRules_ShouldReturnError_WhenDesertAnimalBookedInWinter()
        {
            // Arrange 
            var bugs = new List<Bug> { new() { Name = "Kameel", BugTypeId = 4, Price = 50, bugType = new BugType { Id = 4, Name = "Woestijn" } } }; 
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 12, 1);

            // Act
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert
            Assert.Contains("Woestijndieren zijn niet beschikbaar tussen oktober en februari. Brrr!", result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldReturnError_WhenSnowAnimalBookedInSummer()
        {
            // Arrange
            var bugs = new List<Bug> { new() { Name = "Pinguïn", BugTypeId = 3, Price = 50, bugType = new BugType { Id = 3, Name = "Sneeuw" } } }; 
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 7, 1);

            // Act 
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert
            Assert.Contains("Sneeuwdieren smelten in juni t/m augustus. Olaf is verdrietig!", result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldReturnError_WhenNoCardAndMoreThanThreeBugs()
        {
            // Arrange
            var bugs = new List<Bug>
            {
                new () { Name = "Koe", BugTypeId = 2, Price = 20, bugType = new BugType { Id = 2, Name = "Boerderij" } }, 
                new ()  { Name = "Aap", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new ()  { Name = "Olifant", BugTypeId = 1, Price = 70, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new ()  { Name = "Beer", BugTypeId = 1, Price = 60, bugType = new BugType { Id = 1, Name = "Jungle" } },
            };

            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 4, 11); // Normale doordeweekse dag

            // Act
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert
            Assert.Contains("Je mag maximaal 3 dieren boeken met je klantenkaart.", result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldAllowFourBugs_WhenSilverCard()
        {
            // Arrange 
            var bugs = new List<Bug>
            { 
                new () { Name = "Cobra", BugTypeId = 2, Price = 20, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Aap", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } }, 
                new () { Name = "Olifant", BugTypeId = 1, Price = 70, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Beer", BugTypeId = 1, Price = 60, bugType = new BugType { Id = 1, Name = "Jungle" } },
            };

            var user = new ApplicationUser { Name = "Sumaya", customerCard = new CustomerCard { Type = "zilver" } };
            var date = new DateOnly(2025, 4, 11); // Normale doordeweekse dag

            // Act
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldAllowUnlimitedBugs_WhenGoldCard()
        {
            // Arrange 
            var bugs = new List<Bug>
            {
                new () { Name = "Cobra", BugTypeId = 2, Price = 20, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Aap", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Olifant", BugTypeId = 1, Price = 70, bugType = new BugType { Id = 1, Name = "Jungle" } },
                new () { Name = "Beer", BugTypeId = 1, Price = 60, bugType = new BugType { Id = 1, Name = "Jungle" } },
            };

            var user = new ApplicationUser { Name = "Sumaya", customerCard = new CustomerCard { Type = "goud" } };
            var date = new DateOnly(2025, 4, 11);

            // Act
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldAllowVIPBooking_WhenPlatinumCard()
        {
            // Arrange 
            var bugs = new List<Bug> { new () { Name = "VIP Aap", BugTypeId = 5, Price = 100, bugType = new BugType { Id = 5, Name = "VIP" } } }; 
            var user = new ApplicationUser { Name = "Sumaya", customerCard = new CustomerCard { Type = "platina" } };
            var date = new DateOnly(2025, 4, 11);

            // Act
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void ValidateBookingRules_ShouldNotAllowVIPBooking_WhenNoCard()
        {
            // Arrange 
            var bugs = new List<Bug> { new() { Name = "VIP Aap", BugTypeId = 5, Price = 100, bugType = new BugType { Id = 5, Name = "VIP" } } };
            var user = new ApplicationUser { Name = "Sumaya"};
            var date = new DateOnly(2025, 4, 11);

            // Act
            var result = _bookingValidator.ValidateBookingRules(bugs, date, user);

            // Assert
            Assert.Contains("Je mag alleen VIP beestjes boeken als je een platina klantenkaart hebt.", result); 
        }

        [Fact]
        public void CalculateBookingDiscount_ShouldApplyMondayTuesdayDiscount()
        {
            // Arrange 
            var bugs = new List<Bug> { new () { Name = "Beer", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } } }; 
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 4, 21); // Maandag

            // Act 
            var discount = _bookingValidator.CalculateBookingDiscount(bugs, date, user);

            // Assert
            Assert.Equal(15, discount); // 15% korting op maandag
        }


        [Fact]
        public void CalculateBookingDiscount_ShouldApplyDiscountForLettersABC()
        {
            // Arrange 
            var bugs = new List<Bug> { new Bug { Name = "Aap", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } } };  // Heeft 'a'
            var user = new ApplicationUser { Name = "Sumaya" };
            var date = new DateOnly(2025, 4, 11);

            // Act 
            var discount = _bookingValidator.CalculateBookingDiscount(bugs, date, user); // 2 korting door 'a' 

            // Assert
            Assert.Equal(2, discount);
        }

        [Fact]
        public void CalculateBookingDiscount_ShouldApplyCardDiscount()
        {
            // Arrange 
            var bugs = new List<Bug> { new Bug { Name = "Beer", BugTypeId = 1, Price = 50, bugType = new BugType { Id = 1, Name = "Jungle" } } };
            var user = new ApplicationUser { Name = "Sumaya", customerCard = new CustomerCard { Type = "zilver" } };
            var date = new DateOnly(2025, 4, 11);

            // Act  
            var discount = _bookingValidator.CalculateBookingDiscount(bugs, date, user); // 10% korting voor klanten met een klantenkaart

            // Assert
            Assert.Equal(10, discount);
        }
    }
}
