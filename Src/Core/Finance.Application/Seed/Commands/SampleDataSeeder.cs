namespace Finance.Application.Seed.Commands
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using Common.Interfaces;
    using Domain.Entities;
    using Domain.Enumerations;

    public class SampleDataSeeder
    {
        private readonly IFinanceDbContext context;

        public SampleDataSeeder(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task SeedAllAsync(CancellationToken cancellationToken)
        {
            if (context.Managers.Any())
            {
                return;
            }

            await SeedManagersAsync(cancellationToken);
        }

        private async Task SeedManagersAsync(CancellationToken cancellationToken)
        {
            var managers = new[]
            {
                new Manager { Id = Guid.NewGuid().ToString(), FirstName = "Ivan", LastName = "Ivanov", ReceptionDay = WeekDay.Monday, CreatedOn = DateTime.UtcNow },
                new Manager { Id = Guid.NewGuid().ToString(), FirstName = "Petar", LastName = "Petrov", ReceptionDay = WeekDay.Monday, CreatedOn = DateTime.UtcNow },
                new Manager { Id = Guid.NewGuid().ToString(), FirstName = "Sasho", LastName = "Trifonov", ReceptionDay = WeekDay.Monday, CreatedOn = DateTime.UtcNow },
                new Manager { Id = Guid.NewGuid().ToString(), FirstName = "Lambi", LastName = "Kostov", ReceptionDay = WeekDay.Monday, CreatedOn = DateTime.UtcNow },
                new Manager { Id = Guid.NewGuid().ToString(), FirstName = "Simeon", LastName = "Atanasov", ReceptionDay = WeekDay.Monday, CreatedOn = DateTime.UtcNow }
            };

            context.Managers.AddRange(managers);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}