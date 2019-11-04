namespace Finance.Persistence.Common
{
    using IdentityServer4.EntityFramework.Options;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    public class FinanceDbContextFactory : DesignTimeDbContextFactoryBase<FinanceDbContext>
    {
        protected override FinanceDbContext CreateNewInstance(DbContextOptions<FinanceDbContext> options)
        {
            return new FinanceDbContext(options);
        }
    }
}