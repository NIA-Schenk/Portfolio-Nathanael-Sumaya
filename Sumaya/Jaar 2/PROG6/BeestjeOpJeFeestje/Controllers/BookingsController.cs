using BeestjeOpJeFeestje.Models;
using BeestjeOpJeFeestje.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using BeestjeOpJeFeestje.Viewmodels;
using Microsoft.AspNetCore.Identity;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BeestjeOpJeFeestje.Services;

namespace BeestjeOpJeFeestje.Controllers
{
    public class BookingsController : Controller
    {

        private readonly IBookedBugsRepository bookedBugsRepository;
        private readonly IBugRepository bugRepository;
        private readonly IBookingRepository bookingRepository;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IBookingValidator bookingValidator; 

        public BookingsController(IBookedBugsRepository _bookedBugsRepository, IBugRepository _bugRepository, IBookingRepository _bookingRepository
            , UserManager<ApplicationUser> userManager, IBookingValidator _bookingValidator)
        {
            bookedBugsRepository = _bookedBugsRepository;
            bugRepository = _bugRepository;
            bookingRepository = _bookingRepository;
            _userManager = userManager;
            bookingValidator = _bookingValidator;
        }

        public async Task<IActionResult> Index()
        {
            var userId = _userManager.GetUserId(User); 
            var bookings = await bookingRepository.GetAllBookings(userId);
            return View(bookings);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var booking = await bookingRepository.GetBookingById(id);

            if (booking == null)
            {
                return NotFound();
            }

            var allBookedBugs = booking.BookedBugs?.Select(bb => bb.bug).ToList() ?? new List<Bug>();

            ViewBag.allBookedBugs = allBookedBugs;
            ViewBag.Discount = booking.BookedBugs?.Select(d => d.discount).FirstOrDefault();
            ViewBag.TotalPrice = booking.BookedBugs?.Select(tp => tp.totalPrice).FirstOrDefault();

            return View(booking);
        }

        [HttpGet]
        public IActionResult SelectDate()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SelectDate(DateOnly date)
        {
            return RedirectToAction("ChooseBugs", new { date = date.ToString("yyyy-MM-dd") });
        }

        [HttpGet]
        public async Task<IActionResult> ChooseBugs(string date)
        {
            var allBugs = await bugRepository.GetAllBugs();
            var selectedDate = DateOnly.Parse(date);

            var bookedBugs = await bookedBugsRepository.GetBookedBugsByDate(selectedDate);
            var availableBugs = await bookedBugsRepository.GetAvailableBugsByDate(selectedDate);

            ViewBag.SelectedDate = selectedDate;
            ViewBag.allBugs = allBugs;
            ViewBag.bookedBugs = bookedBugs;
            ViewBag.availableBugs = availableBugs;

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChooseBugs(DateOnly BookingDate, List<int> selectedBugs)
        {
            var allBugs = await bugRepository.GetAllBugs();
            var bookedBugs = await bookedBugsRepository.GetBookedBugsByDate(BookingDate);
            var availableBugs = await bookedBugsRepository.GetAvailableBugsByDate(BookingDate);

            ViewBag.allBugs = allBugs;
            ViewBag.bookedBugs = bookedBugs;
            ViewBag.availableBugs = availableBugs;
            ViewBag.SelectedDate = BookingDate;

            HttpContext.Session.SetString("BookingDate", BookingDate.ToString("yyyy-MM-dd"));
            HttpContext.Session.SetString("SelectedBugIds", string.Join(",", selectedBugs));

            var allSelectedBugs = allBugs.Where(b => selectedBugs.Contains(b.Id)).ToList();

            var user = await _userManager.Users
                .Include(u => u.customerCard)
                .FirstOrDefaultAsync(u => u.Id == _userManager.GetUserId(User));

            var validationErrors = bookingValidator.ValidateBookingRules(allSelectedBugs, BookingDate, user);
            if (validationErrors.Any())
            {
                TempData["BookingErrors"] = validationErrors;
                return View(); 
            }

            TempData["Success"] = "Je hebt succesvol een nieuw beestje toegevoegd!";

            return RedirectToAction("EnterPersonalDetails");
        }

        [HttpGet]
        public async Task<IActionResult> EnterPersonalDetails()
        {
            // Haal geselecteerde beestjes op uit de sessie
            var selectedBugIdsString = HttpContext.Session.GetString("SelectedBugIds");
            var dateString = HttpContext.Session.GetString("BookingDate");

            if (string.IsNullOrEmpty(selectedBugIdsString) || string.IsNullOrEmpty(dateString))
            {
                return RedirectToAction("ChooseBugs");
            }

            var allBugs = await bugRepository.GetAllBugs();

            var selectedBugIds = selectedBugIdsString.Split(',').Select(int.Parse).ToList();
            var selectedBugs = allBugs.Where(b => selectedBugIds.Contains(b.Id)).ToList();

            var date = DateOnly.Parse(dateString);

            var viewModel = new BookingVM
            {
                Date = date,
                SelectedBugs = selectedBugs
            };

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EnterPersonalDetails(BookingVM model)
        {
            var selectedBugIdsString = HttpContext.Session.GetString("SelectedBugIds");
            var selectedBugIds = selectedBugIdsString?.Split(',').Select(int.Parse).ToList();

            if (selectedBugIds == null || selectedBugIds.Count == 0)
            {
                return RedirectToAction("ChooseBugs");
            }

            var allBugs = await bugRepository.GetAllBugs();
            var selectedBugs = allBugs.Where(b => selectedBugIds.Contains(b.Id)).ToList();

            ApplicationUser user = null;

            if(User?.Identity != null && User.Identity.IsAuthenticated)
            {
                user = await _userManager.GetUserAsync(User);

                // Gebruik de gegevens van de ingelogde gebruiker als de velden leeg zijn
                model.Name = string.IsNullOrEmpty(model.Name) ? user.Name : model.Name;
                model.Address = string.IsNullOrEmpty(model.Address) ? user.Address : model.Address;
                model.Email = string.IsNullOrEmpty(model.Email) ? user.Email : model.Email;
                model.PhoneNumber = string.IsNullOrEmpty(model.PhoneNumber) ? user.PhoneNumber : model.PhoneNumber;
            }

            var booking = new Booking
            {
                Date = model.Date,
                Name = model.Name,
                Address = model.Address,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                UserId = user?.Id 
            };

            try
            {
                await bookingRepository.CreateBooking(booking);
                var bookingJson = JsonSerializer.Serialize(booking);
                HttpContext.Session.SetString("CurrentBooking", bookingJson);

                return RedirectToAction("ConfirmBooking");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fout bij opslaan: {ex.Message}");
                return View(model); 
            }
        }


        [HttpGet]
        public async Task<IActionResult> ConfirmBooking()
        {
            var bookingJson = HttpContext.Session.GetString("CurrentBooking");
            var selectedBugIdsString = HttpContext.Session.GetString("SelectedBugIds");
            var dateString = HttpContext.Session.GetString("BookingDate");

            if (string.IsNullOrEmpty(bookingJson) || string.IsNullOrEmpty(selectedBugIdsString) || string.IsNullOrEmpty(dateString))
            {
                return RedirectToAction("ChooseBugs");
            }

            var date = DateOnly.Parse(dateString);

            var booking = JsonSerializer.Deserialize<Booking>(bookingJson);

            // Geselecteerde beestjes ophalen
            var selectedBugIds = selectedBugIdsString.Split(',').Select(int.Parse).ToList();
            var allBugs = await bugRepository.GetAllBugs();
            var selectedBugs = allBugs.Where(b => selectedBugIds.Contains(b.Id)).ToList();

            var user = await _userManager.Users
                .Include(u => u.customerCard)
                .FirstOrDefaultAsync(u => u.Id == _userManager.GetUserId(User));

            double discount = bookingValidator.CalculateBookingDiscount(selectedBugs, date, user);
            double totalPrice = bookingValidator.CalculateTotal(selectedBugs, discount);

            HttpContext.Session.SetString("Discount", discount.ToString());
            HttpContext.Session.SetString("TotalPrice", totalPrice.ToString());

            booking.BookedBugs = selectedBugs.Select(b => new BookedBugs
            {
                BugId = b.Id,
                BookingId = booking.Id, 
                BookingDate = date, 
                bug = b
            }).ToList();

            ViewBag.Discount = discount;
            ViewBag.TotalPrice = totalPrice;

            return View(booking);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ActionName("ConfirmBooking")]
        public async Task<IActionResult> FinalizeBooking()
        {
            var bookingJson = HttpContext.Session.GetString("CurrentBooking");
            var selectedBugIdsString = HttpContext.Session.GetString("SelectedBugIds");
            var dateString = HttpContext.Session.GetString("BookingDate");

            if (string.IsNullOrEmpty(bookingJson) || string.IsNullOrEmpty(selectedBugIdsString) || string.IsNullOrEmpty(dateString))
            {
                return RedirectToAction("ChooseBugs");
            }

            var date = DateOnly.Parse(dateString);

            var booking = JsonSerializer.Deserialize<Booking>(bookingJson);

            if (booking == null || booking.Id == 0) 
            {
                var latestBooking = await bookingRepository.GetBookingById(booking.Id);
                if (latestBooking == null)
                {
                    return RedirectToAction("EnterPersonalDetails");
                }
                booking = latestBooking;
            }

            var selectedBugIds = selectedBugIdsString.Split(',').Select(int.Parse).ToList();

            try
            {
                var allBugs = await bugRepository.GetAllBugs();
                var selectedBugs = allBugs.Where(b => selectedBugIds.Contains(b.Id)).ToList();

                var discountString = HttpContext.Session.GetString("Discount");
                var totalPriceString = HttpContext.Session.GetString("TotalPrice");

                double discount = string.IsNullOrEmpty(discountString) ? 0 : double.Parse(discountString);
                double totalPrice = string.IsNullOrEmpty(totalPriceString) ? 0 : double.Parse(totalPriceString);

                var bookedBugs = selectedBugIds.Select(bugId =>
                {
                    var selectedBug = selectedBugs.FirstOrDefault(b => b.Id == bugId);
                    return new BookedBugs
                    {
                        BookingDate = date,
                        BugId = bugId,
                        BookingId = booking.Id,
                        bug = selectedBug,
                        booking = booking,
                        discount = discount,
                        totalPrice = totalPrice
                    }; 
                }).ToList();
                
                booking.BookedBugs = bookedBugs;
                
                await bookingRepository.UpdateBooking(booking);

                TempData["Success"] = "Beestje(s) succesvol geboekt!";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Er is een fout opgetreden bij het boeken van het beestje.");
                Console.WriteLine($"Fout bij het boeken van het beestje: {ex.Message}");
                return View(booking); 
            }
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var booking = await bookingRepository.GetBookingById(id);

            if (booking == null)
            {
                return NotFound("Geen boeking gevonden");
            }

            booking.BookedBugs = await bookedBugsRepository.GetBookedBugsByBookingId(id);

            return View(booking);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteBookedBugs(int id)
        {
            var booking = await bookingRepository.GetBookingById(id);

            if (booking == null)
            {
                return NotFound("Geen boeking gevonden");
            }

            try
            {
                var bookedBugs = await bookedBugsRepository.GetBookedBugsByBookingId(id);

                foreach (var bb in bookedBugs)
                {
                    await bookedBugsRepository.DeleteBooking(bb);
                }

                await bookingRepository.DeleteBooking(booking);

                TempData["Success"] = "De volledige boeking is succesvol verwijderd.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Er ging iets mis bij het verwijderen van de boeking.";
                return View(booking);
            }
        }
    }
}
