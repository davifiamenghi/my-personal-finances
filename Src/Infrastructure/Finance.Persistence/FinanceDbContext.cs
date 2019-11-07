namespace Finance.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Migrations;

    using Application.Common.Interfaces;
    using Common;
    using Domain.Entities;
    using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity;
    using IdentityServer4.EntityFramework.Options;
    using Microsoft.Extensions.Options;

    public class FinanceDbContext : KeyApiAuthorizationDbContext<FinanceUser, FinanceRole, string>, IFinanceDbContext
    {
        public DbSet<Expense> Expenses { get; set; }

        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }

        public DbSet<Income> Incomes { get; set; }

        public DbSet<IncomeCategory> IncomeCategories { get; set; }

        public DbSet<FinanceUser> FinanceUsers { get; set; }

        public DbSet<FinanceRole> FinanceRoles { get; set; }

        public FinanceDbContext(DbContextOptions options,
        IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
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