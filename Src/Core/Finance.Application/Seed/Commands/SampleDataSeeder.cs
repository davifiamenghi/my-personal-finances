namespace Finance.Application.Seed.Commands
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using Common.Interfaces;
    using Finance.Domain.Entities;

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
    }
}