using BeestjeOpJeFeestje.Models;

namespace BeestjeOpJeFeestje.Repositories
{
    public interface ICardRepository
    {
        public Task<CustomerCard?> GetCardById(int id);

        public Task CreateCard(CustomerCard customerCard);

        public Task UpdateCard(CustomerCard customerCard);

        public Task DeleteCard(CustomerCard customerCard);

        public Task<List<CustomerCard>> GetAllCards();

        public Task<string?> GetCustomerCardTypeById(int id);
    }
}
