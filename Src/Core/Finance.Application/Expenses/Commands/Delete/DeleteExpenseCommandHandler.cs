namespace Finance.Application.Expenses.Commands.Delete
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;

    public class DeleteExpenseCommandHandler : IRequestHandler<DeleteExpenseCommand>
    {
        private const string Expense = "Expense";

        private readonly IFinanceDbContext context;

        public DeleteExpenseCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(DeleteExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = await this.context.Expenses.FindAsync(request.Id);

            if (expense == null)
            {
                throw new NotFoundException(Expense, request.Id);
            }

            this.context.Expenses.Remove(expense);
            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
