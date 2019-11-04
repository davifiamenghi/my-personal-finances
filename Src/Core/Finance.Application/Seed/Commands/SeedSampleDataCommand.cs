namespace Finance.Application.Seed.Commands
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Interfaces;

    public class SeedSampleDataCommand : IRequest
    {
    }

    public class SeedSampleDataCommandHandler : IRequestHandler<SeedSampleDataCommand>
    {
        private readonly IFinanceDbContext context;

        public SeedSampleDataCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(SeedSampleDataCommand request, CancellationToken cancellationToken)
        {
            var seeder = new SampleDataSeeder(context);

            await seeder.SeedAllAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
