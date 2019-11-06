namespace Finance.Application.Common.Interfaces
{        
    using System.Threading.Tasks;
    using System.Threading;

    using Microsoft.EntityFrameworkCore;

    using Domain.Entities;

    public interface IFinanceDbContext
    {
        DbSet<Income> Incomes { get; set; }

        DbSet<Expense> Expenses { get; set; }

        DbSet<IncomeCategory> IncomeCategories { get; set; }

        DbSet<ExpenseCategory> ExpenseCategories { get; set; }

        DbSet<FinanceClient> FinanceClients { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}