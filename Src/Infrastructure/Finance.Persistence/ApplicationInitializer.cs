namespace Finance.Persistence
{
    using System;
    using System.Linq;

    using Domain.Entities;
    using Domain.Enumerations;

    public class ApplicationInitializer
    {
        public static void Initialize(FinanceDbContext context)
        {
            var initializer = new ApplicationInitializer();
            initializer.SeedEverything(context);
        }

        public void SeedEverything(FinanceDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Managers.Any())
            {
                return; // Db has been seeded
            }

            SeedManagers(context);
        }

        private void SeedManagers(FinanceDbContext context)
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
            context.SaveChanges();
        }
    }
}