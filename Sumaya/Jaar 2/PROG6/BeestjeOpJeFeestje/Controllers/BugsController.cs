using BeestjeOpJeFeestje.Models;
using BeestjeOpJeFeestje.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BeestjeOpJeFeestje.Controllers
{
    public class BugsController : Controller
    {

        private readonly IBugRepository bugRepository;
        private readonly IBugTypeRepository bugTypeRepository;

        public BugsController(IBugRepository _bugRepository, IBugTypeRepository _bugTypeRepository)
        {
            bugRepository = _bugRepository;
            bugTypeRepository = _bugTypeRepository; 
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var bugs = await bugRepository.GetAllBugs();

            var types = await bugTypeRepository.GetAllBugTypes();
            ViewBag.Types = new SelectList(types, "Id", "Name");

            return View(bugs);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var getBug = await bugTypeRepository.GetBugWithBugTypes(id);

            ViewBag.bug = getBug;

            return View(getBug);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var types = await bugTypeRepository.GetAllBugTypes();
            ViewBag.Types = new SelectList(types, "Id", "Name");

            return View(); 
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Bug bug)
        {
            var types = await bugTypeRepository.GetAllBugTypes();
            ViewBag.Types = new SelectList(types, "Id", "Name");

            try
            {
                await bugRepository.CreateBug(bug);

                TempData["Success"] = "Je hebt succesvol een nieuw beestje toegevoegd!";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fout bij opslaan: {ex.Message}");
                ViewBag.Types = new SelectList(types, "Id", "Name");

                return View(bug);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {

            var bug = await bugRepository.GetBug(id);

            var types = await bugTypeRepository.GetAllBugTypes();
            ViewBag.Types = new SelectList(types, "Id", "Name");

            if (bug == null)
            {
                return NotFound("Geen beestje gevonden");
            }

            ViewBag.bug = bug;
            ViewBag.Types = new SelectList(types, "Id", "Name");

            return View(bug);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Bug bug)
        {

            var types = await bugTypeRepository.GetAllBugTypes();
            ViewBag.Types = new SelectList(types, "Id", "Name");

            if (bug == null)
            {
                return NotFound("Geen beestje gevonden");
            }

            ViewBag.bug = bug;

            try
            {
                await bugRepository.UpdateBug(bug);
            }
            catch (Exception ex)
            {
                ViewBag.Types = new SelectList(types, "Id", "Name");
                return View(bug);
            }
            TempData["EditSuccess"] = "Je hebt succesvol een beestje aangepast!";
            return RedirectToAction("Index");
        }


        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var bug = await bugRepository.GetBug(id);

            if (bug == null)
            {
                return NotFound("Geen beestje gevonden");
            }

            ViewBag.bug = bug;

            return View(bug);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id, Bug bug)
        {
            if (bug == null)
            {
                return NotFound("Geen beestje gevonden");
            }

            ViewBag.bug = bug;

            try
            {
                await bugRepository.DeleteBug(bug);   
            }
            catch (Exception ex)
            {
                return View(bug);
            }
            TempData["DeleteSuccess"] = "Je hebt succesvol een beestje verwijderd!";
            return RedirectToAction("Index");
        }
    }
}
