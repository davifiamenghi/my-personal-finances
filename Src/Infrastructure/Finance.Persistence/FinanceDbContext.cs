namespace Finance.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Migrations;
    using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
    using Microsoft.Extensions.Options;
    using IdentityServer4.EntityFramework.Options;

    using Domain.Entities;
    using Common;
    using Application.Common.Interfaces;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class FinanceDbContext : DbContext, IFinanceDbContext
    {
        public DbSet<Manager> Managers { get; set; }
        
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