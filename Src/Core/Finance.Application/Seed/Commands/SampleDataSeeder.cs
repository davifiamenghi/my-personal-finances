namespace Finance.Application.Seed.Commands
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using Common.Interfaces;
    using Finance.Domain.Entities;
    using Microsoft.AspNetCore.Identity;

    public class SampleDataSeeder
    {
        private readonly IFinanceDbContext context;

        public SampleDataSeeder(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task SeedAllAsync(CancellationToken cancellationToken)
        {
            if (context.FinanceRoles.Any())
            {
                return;
            }

            await SeedManagersAsync(cancellationToken);
            await SeedAdminUserAsync(cancellationToken);
            await SeedExpenseCategories(cancellationToken);
            await SeedIncomeCategories(cancellationToken);
        }

        private async Task SeedIncomeCategories(CancellationToken cancellationToken)
        {
            var incomeCategories = new[]
            {
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Salary" },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Bonuses" },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Honorarium" },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Interests" },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Business" },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Rent" }
            };

            context.IncomeCategories.AddRange(incomeCategories);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedExpenseCategories(CancellationToken cancellationToken)
        {
            var expenseCategories = new[]
            {
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Energy" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Car" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Phone" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Children" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Food" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Internet and TV" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Fun" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Sport" },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Clothes and Shoes" }
            };

            context.ExpenseCategories.AddRange(expenseCategories);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedManagersAsync(CancellationToken cancellationToken)
        {
            var roles = new[]
            {
                new FinanceRole { Id = Guid.NewGuid().ToString(), Name = "Administrator", NormalizedName = "ADMINISTRATOR" },
                new FinanceRole { Id = Guid.NewGuid().ToString(), Name = "User", NormalizedName = "USER" },
            };

            context.FinanceRoles.AddRange(roles);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedAdminUserAsync(CancellationToken cancellationToken)
        {
            var user = new FinanceUser
            {
                UserName = "admin@admin.com",
                NormalizedUserName = "admin@admin.com",
                Email = "admin@admin.com",
                NormalizedEmail = "admin@admin.com",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var password = new PasswordHasher<FinanceUser>();
            var hashed = password.HashPassword(user, "123456");
            user.PasswordHash = hashed;

            context.FinanceUsers.Add(user);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}