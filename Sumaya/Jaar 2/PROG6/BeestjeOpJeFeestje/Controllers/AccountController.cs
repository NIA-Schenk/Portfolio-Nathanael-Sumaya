using BeestjeOpJeFeestje.Models;
using BeestjeOpJeFeestje.Repositories;
using BeestjeOpJeFeestje.Viewmodels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BeestjeOpJeFeestje.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ICardRepository _cardRepository; 

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager, ICardRepository cardRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _cardRepository = cardRepository; 
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register()
        {
            var roles = await _roleManager.Roles.Select(r => r.Name).ToListAsync();
            var customerCards = await _cardRepository.GetAllCards(); 

            var model = new RegisterVM
            {
                AvailableRoles = roles,
                customerCards = customerCards
            };

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register(RegisterVM model)
        {
            var customerCards = await _cardRepository.GetAllCards();

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email, Name = model.Name, Address = model.Address, PhoneNumber = model.PhoneNumber };

            if (model.SelectedCustomerCardId != null)
            {
                var chosenCustomercard = await _cardRepository.GetCardById((int)model.SelectedCustomerCardId);
                user = new ApplicationUser { UserName = model.Email, Email = model.Email, Name = model.Name, Address = model.Address, PhoneNumber = model.PhoneNumber,CustomerCardId = model.SelectedCustomerCardId, customerCard = chosenCustomercard };
            }

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, model.SelectedRole);
                return RedirectToAction("Details", new { id = user.Id , password = model.Password});
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return View(model);
        }


        [HttpGet]
        [ActionName("Details")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AccountDetails(string id, string password)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            if (user.CustomerCardId != null)
            {
                var customerCard = await _cardRepository.GetCustomerCardTypeById((int)user.CustomerCardId);
                ViewBag.CustomerCard = customerCard;
            }

            TempData["GeneratedPassword"] = password;

            return View(user);
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginVM model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }
            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
