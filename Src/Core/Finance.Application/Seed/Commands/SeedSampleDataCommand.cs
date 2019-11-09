namespace Finance.Application.Seed.Commands
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Interfaces;
    using Finance.Domain.Entities;
    using Microsoft.AspNetCore.Identity;

    public class SeedSampleDataCommand : IRequest
    {
    }

    public class SeedSampleDataCommandHandler : IRequestHandler<SeedSampleDataCommand>
    {
        private readonly IFinanceDbContext context;
        private readonly UserManager<FinanceUser> userManager;

        public SeedSampleDataCommandHandler(IFinanceDbContext context, UserManager<FinanceUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public async Task<Unit> Handle(SeedSampleDataCommand request, CancellationToken cancellationToken)
        {
            var seeder = new SampleDataSeeder(context, userManager);

            await seeder.SeedAllAsync(cancellationToken);

            return Unit.Value;
        }


    }
}
