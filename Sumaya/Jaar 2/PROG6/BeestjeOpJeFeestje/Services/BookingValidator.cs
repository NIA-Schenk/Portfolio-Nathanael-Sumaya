using System;
using System.Collections.Generic;
using System.Linq;
using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Services
{
    public class BookingValidator : IBookingValidator
    {
        public List<string> ValidateBookingRules(List<Bug> selectedBugs, DateOnly date, ApplicationUser user)
        {
            var errors = new List<string>();

            bool hasFarmAnimal = selectedBugs.Any(b => b.bugType?.Name == "Boerderij");
            bool hasLionOrBear = selectedBugs.Any(b => b.bugType?.Name == "Jungle" || b.bugType?.Name == "Sneeuw");
            if (hasFarmAnimal && hasLionOrBear)
                errors.Add("Je kunt geen boerderijdier combineren met een Jungle- of Sneeuwdier. Nom nom nom!");

            if ((date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday) &&
                selectedBugs.Any(b => b.Name == "Pinguïn"))
                errors.Add("Pinguïns kunnen alleen doordeweeks geboekt worden. Dieren in pak werken alleen doordeweeks!");

            if (new[] { 10, 11, 12, 1, 2 }.Contains(date.Month) && selectedBugs.Any(b => b.bugType?.Name == "Woestijn"))
                errors.Add("Woestijndieren zijn niet beschikbaar tussen oktober en februari. Brrr!");

            if (new[] { 6, 7, 8 }.Contains(date.Month) && selectedBugs.Any(b => b.bugType?.Name == "Sneeuw"))
                errors.Add("Sneeuwdieren smelten in juni t/m augustus. Olaf is verdrietig!");

            int maxAllowed = 3;
            var card = user?.customerCard?.Type?.ToLower();

            if (card == "zilver") maxAllowed = 4;
            else if (card == "goud" || card == "platina") maxAllowed = int.MaxValue;

            bool hasVipBug = selectedBugs.Any(b => b.bugType?.Name == "VIP");
            if (hasVipBug && card != "platina")
                errors.Add("Je mag alleen VIP beestjes boeken als je een platina klantenkaart hebt.");

            if (selectedBugs.Count > maxAllowed)
                errors.Add($"Je mag maximaal {maxAllowed} dieren boeken met je klantenkaart.");

            return errors;
        }

        public double CalculateBookingDiscount(List<Bug> bugs, DateOnly date, ApplicationUser user)
        {
            double discount = 0;

            if (bugs.GroupBy(b => b.bugType?.Name).Any(g => g.Count() >= 3))
                discount += 10;

            if (bugs.Any(b => b.Name.ToLower() == "eend") && new Random().Next(6) == 0)
                discount += 50;

            if (date.DayOfWeek == DayOfWeek.Monday || date.DayOfWeek == DayOfWeek.Tuesday)
                discount += 15;

            int bonus = 0;
            foreach (var bug in bugs)
            {
                var lettersInName = bug.Name.ToLower().ToHashSet();
                int streak = 0;

                for (char c = 'a'; c <= 'z'; c++)
                {
                    if (lettersInName.Contains(c))
                        streak++;
                    else
                        break;
                }

                bonus += streak * 2;
            }
            discount += bonus;

            if (user?.customerCard != null)
                discount += 10;

            return Math.Min(discount, 60);
        }

        public double CalculateTotal(List<Bug> bugs, double discount)
        {
            var total = bugs.Sum(b => b.Price);
            return total - (total * (discount / 100));
        }
    }
}
