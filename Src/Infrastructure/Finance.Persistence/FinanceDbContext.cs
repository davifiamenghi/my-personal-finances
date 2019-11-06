namespace Finance.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Migrations;

    using Application.Common.Interfaces;
    using Common;
    using Domain.Entities;

    public class FinanceDbContext : DbContext, IFinanceDbContext
    {
        public DbSet<FinanceClient> FinanceClients { get; set; }

        public DbSet<Expense> Expenses { get; set; }

        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }

        public DbSet<Income> Incomes { get; set; }

        public DbSet<IncomeCategory> IncomeCategories { get; set; }


        public FinanceDbContext(DbContextOptions<FinanceDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(typeof(FinanceDbContext).Assembly);            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.ReplaceService<IMigrationsSqlGenerator, CustomSqlServerMigrationsSqlGenerator>();
        }        
    }    
}