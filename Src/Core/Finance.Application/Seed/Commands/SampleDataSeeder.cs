namespace Finance.Application.Seed.Commands
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using Common.Interfaces;
    using Domain.Entities;
    using Domain.Enumerations;

    public class SampleDataSeeder
    {
        private readonly IFinanceDbContext context;

        public SampleDataSeeder(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task SeedAllAsync(CancellationToken cancellationToken)
        {
            if (context.FinanceClients.Any())
            {
                return;
            }

            //await SeedManagersAsync(cancellationToken);
        }
    }
}