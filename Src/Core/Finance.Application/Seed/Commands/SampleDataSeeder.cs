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
        private readonly UserManager<FinanceUser> userManager;

        public SampleDataSeeder(IFinanceDbContext context, UserManager<FinanceUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public async Task SeedAllAsync(CancellationToken cancellationToken)
        {
            if (context.FinanceRoles.Any())
            {
                return;
            }

            await SeedRolesAsync(cancellationToken);
            await SeedUserAsync(cancellationToken, userManager);
            await SeedExpenseCategories(cancellationToken);
            await SeedIncomeCategories(cancellationToken);
            await SeedExpensesAsync(cancellationToken);
            await SeedIncomesAsync(cancellationToken);
        }

        private async Task SeedIncomesAsync(CancellationToken cancellationToken)
        {
            var user = context.FinanceUsers.FirstOrDefault();
            var category = context.IncomeCategories.FirstOrDefault();

            var incomes = new[]
            {
                new Income { Id = Guid.NewGuid().ToString(), Merchant = "VSG", CategoryId = category.Id, UserId = user.Id },
                new Income { Id = Guid.NewGuid().ToString(), Merchant = "UniCredit", CategoryId = category.Id, UserId = user.Id },
                new Income { Id = Guid.NewGuid().ToString(), Merchant = "University", CategoryId = category.Id, UserId = user.Id }
            };

            context.Incomes.AddRange(incomes);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedExpensesAsync(CancellationToken cancellationToken)
        {
            var user = context.FinanceUsers.FirstOrDefault();
            var category = context.ExpenseCategories.FirstOrDefault();

            var expenses = new[]
            {
                new Expense { Id = Guid.NewGuid().ToString(), Merchant = "EnergoPro", CategoryId = category.Id, UserId = user.Id },
                new Expense { Id = Guid.NewGuid().ToString(), Merchant = "Lukoul", CategoryId = category.Id, UserId = user.Id },
                new Expense { Id = Guid.NewGuid().ToString(), Merchant = "Hipoland", CategoryId = category.Id, UserId = user.Id }
            };

            context.Expenses.AddRange(expenses);
            await context.SaveChangesAsync(cancellationToken);
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

        private async Task SeedRolesAsync(CancellationToken cancellationToken)
        {
            var roles = new[]
            {
                new FinanceRole { Id = Guid.NewGuid().ToString(), Name = "Administrator", NormalizedName = "ADMINISTRATOR" },
                new FinanceRole { Id = Guid.NewGuid().ToString(), Name = "User", NormalizedName = "USER" },
            };

            context.FinanceRoles.AddRange(roles);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedUserAsync(CancellationToken cancellationToken, UserManager<FinanceUser> userManager)
        {
            if (userManager.FindByNameAsync("admin@admin.bg").Result == null)
            {
                FinanceUser user = new FinanceUser();
                user.UserName = "admin@admin.bg";
                user.Email = "admin@admin.bg";

                await userManager.CreateAsync(user, "123456");
            }         
        }
    }
}