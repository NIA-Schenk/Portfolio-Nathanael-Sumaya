using BeestjeOpJeFeestje.Models;
using BeestjeOpJeFeestje.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BeestjeOpJeFeestje.Controllers
{
    public class CardController : Controller
    {

        private readonly ICardRepository cardRepository;

        public CardController(ICardRepository _cardRepository)
        {
            cardRepository = _cardRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var cards = await cardRepository.GetAllCards(); 
            return View(cards);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var getCard = await cardRepository.GetCardById(id);

            ViewBag.card = getCard;

            return View(getCard);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CustomerCard card)
        { 
            try
            {
                await cardRepository.CreateCard(card);

                TempData["Success"] = "Je hebt succesvol een nieuw klantenkaart toegevoegd!";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fout bij opslaan: {ex.Message}");
                return View(card);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var card = await cardRepository.GetCardById(id);

            if (card == null)
            {
                return NotFound("Geen klantenkaart gevonden");
            }

            ViewBag.card = card;

            return View(card);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, CustomerCard customerCard)
        { 
            if (customerCard == null)
            {
                return NotFound("Geen klantenkaart gevonden");
            }

            ViewBag.customerCard = customerCard;

            try
            {
                await cardRepository.UpdateCard(customerCard);
            }
            catch (Exception ex)
            {
                return View(customerCard);
            }
            TempData["EditSuccess"] = "Je hebt succesvol een klantenkaart aangepast!";
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var card = await cardRepository.GetCardById(id);

            if (card == null)
            {
                return NotFound("Geen klantenkaart gevonden");
            }

            ViewBag.card = card;

            return View(card);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id, CustomerCard customerCard)
        {
            if (customerCard == null)
            {
                return NotFound("Geen klantenkaart gevonden");
            }

            ViewBag.card = customerCard;

            try
            {
                await cardRepository.DeleteCard(customerCard);
            }
            catch (Exception ex)
            {
                return View(customerCard);
            }
            TempData["DeleteSuccess"] = "Je hebt succesvol een klantenkaart verwijderd!";
            return RedirectToAction("Index");
        }
    }
}

