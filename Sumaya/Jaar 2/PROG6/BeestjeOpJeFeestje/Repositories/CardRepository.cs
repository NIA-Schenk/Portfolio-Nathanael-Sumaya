using BeestjeOpJeFeestje.Data;
using BeestjeOpJeFeestje.Models;
using BeestjeOpJeFeestje.Viewmodels;
using Microsoft.EntityFrameworkCore;

namespace BeestjeOpJeFeestje.Repositories
{
    public class CardRepository : ICardRepository
    {

        private readonly ApplicationDbContext dbContext;

        public CardRepository(ApplicationDbContext _context)
        {
            dbContext = _context;
        }

        public async Task CreateCard(CustomerCard customerCard)
        {
            dbContext.CustomerCards.Add(customerCard);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteCard(CustomerCard customerCard)
        {
            dbContext.CustomerCards.Remove(customerCard);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<CustomerCard>> GetAllCards()
        {
            return await dbContext.CustomerCards
                .Include(cc => cc.Users)
                .ToListAsync();
        }

        public async Task<CustomerCard?> GetCardById(int id)
        {
            return await dbContext.CustomerCards
                .Include(cc => cc.Users)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<string?> GetCustomerCardTypeById(int id)
        {
            return await dbContext.CustomerCards
                .Where(cc => cc.Id == id)
                .Select(cc => cc.Type)
                .FirstOrDefaultAsync();
        }

        public async Task UpdateCard(CustomerCard customerCard)
        {
            var existingCards = await dbContext.CustomerCards
                .Include(cc => cc.Users)
                .FirstOrDefaultAsync(b => b.Id == customerCard.Id);

            if (existingCards != null)
            {
                existingCards.Type = customerCard.Type;

                dbContext.CustomerCards.Update(existingCards);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
