using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Services
{
    public interface IBookingValidator
    {
        public List<string> ValidateBookingRules(List<Bug> selectedBugs, DateOnly date, ApplicationUser user);

        public double CalculateBookingDiscount(List<Bug> bugs, DateOnly date, ApplicationUser user);

        public double CalculateTotal(List<Bug> bugs, double discount);
    }
}
