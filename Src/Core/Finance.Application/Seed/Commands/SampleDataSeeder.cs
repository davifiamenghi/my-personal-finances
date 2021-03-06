﻿namespace Finance.Application.Seed.Commands
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
            await SeedCashflowTypesAsync(cancellationToken);
            await SeedExpenseCategories(cancellationToken);
            await SeedIncomeCategories(cancellationToken);
            await SeedExpensesAsync(cancellationToken);
            await SeedIncomesAsync(cancellationToken);
        }

        private async Task SeedCashflowTypesAsync(CancellationToken cancellationToken)
        {
            var cashflowTypes = new[]
            {
                new CashflowType { Description = "Gross Payment." },
                new CashflowType { Description = "Monthly Bonuses." },
                new CashflowType { Description = "Partner Gross Payment." },
                new CashflowType { Description = "Partner Monthly Bonuses." },
                new CashflowType { Description = "Business, Dividents, Rents and others." },
                new CashflowType { Description = "Pay to yourself first." },
                new CashflowType { Description = "Deductions from Gross Payments." },
                new CashflowType { Description = "Fixed monthly expenses." },
                new CashflowType { Description = "Unfixed monthly expenses." },
                new CashflowType { Description = "Remainder for investments." }
            };

            context.CashflowTypes.AddRange(cashflowTypes);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedIncomesAsync(CancellationToken cancellationToken)
        {
            var user = context.FinanceUsers.FirstOrDefault();
            var category = context.IncomeCategories.FirstOrDefault();

            var incomes = new[]
            {
                new Income { Id = Guid.NewGuid().ToString(), Merchant = "VSG", CategoryId = category.Id, UserId = user.Id, Date = DateTime.UtcNow, Total = 1156.60M },
                new Income { Id = Guid.NewGuid().ToString(), Merchant = "UniCredit", CategoryId = category.Id, UserId = user.Id, Date = DateTime.UtcNow, Total = 5.80M },
                new Income { Id = Guid.NewGuid().ToString(), Merchant = "University", CategoryId = category.Id, UserId = user.Id, Date = DateTime.UtcNow, Total = 220.60M }
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
                new Expense { Id = Guid.NewGuid().ToString(), Merchant = "EnergoPro", CategoryId = category.Id, UserId = user.Id, Date = DateTime.UtcNow, Total = 23.60M },
                new Expense { Id = Guid.NewGuid().ToString(), Merchant = "Lukoul", CategoryId = category.Id, UserId = user.Id, Date = DateTime.UtcNow, Total = 55.30M },
                new Expense { Id = Guid.NewGuid().ToString(), Merchant = "Hipoland", CategoryId = category.Id, UserId = user.Id, Date = DateTime.UtcNow, Total = 152.80M }
            };

            context.Expenses.AddRange(expenses);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedIncomeCategories(CancellationToken cancellationToken)
        {
            var user = context.FinanceUsers.FirstOrDefault();

            var incomeCategories = new[]
            {
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Salary", TypeId = 1, UserId = user.Id },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Bonuses", TypeId = 2, UserId = user.Id },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Partner Salary", TypeId = 3, UserId = user.Id  },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Partner Bonuses", TypeId = 4, UserId = user.Id },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Business", TypeId = 5, UserId = user.Id },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Rents", TypeId = 5, UserId = user.Id },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Horariums", TypeId = 5, UserId = user.Id },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Dividents", TypeId = 5, UserId = user.Id },
                new IncomeCategory { Id = Guid.NewGuid().ToString(), Name = "Others", TypeId = 5, UserId = user.Id }
            };

            context.IncomeCategories.AddRange(incomeCategories);
            await context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedExpenseCategories(CancellationToken cancellationToken)
        {
            var user = context.FinanceUsers.FirstOrDefault();

            var expenseCategories = new[]
            {
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Taxes", TypeId = 7, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Energy Bills", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Water Bills", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Phone Bills", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Home Bills", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "I-net/TV Bills", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Car Maintenance", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Rents", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Food", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Childern", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Home Maintenance", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Cosmetics", TypeId = 9, UserId = user.Id  },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Clothes and Shoes", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Outlook", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Insurances", TypeId = 8, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Business", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Gifts", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Fun", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Rest", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Sport", TypeId = 9, UserId = user.Id },
                new ExpenseCategory { Id = Guid.NewGuid().ToString(), Name = "Others", TypeId = 9, UserId = user.Id }
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