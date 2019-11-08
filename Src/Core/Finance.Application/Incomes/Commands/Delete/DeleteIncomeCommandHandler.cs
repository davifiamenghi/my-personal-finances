namespace Finance.Application.Incomes.Commands.Delete
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;

    public class DeleteIncomeCommandHandler : IRequestHandler<DeleteIncomeCommand>
    {
        private const string Income = "Income";

        private readonly IFinanceDbContext context;

        public DeleteIncomeCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(DeleteIncomeCommand request, CancellationToken cancellationToken)
        {
            var income = await this.context.Incomes.FindAsync(request.Id);

            if (income == null)
            {
                throw new NotFoundException(Income, request.Id);
            }

            this.context.Incomes.Remove(income);
            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
