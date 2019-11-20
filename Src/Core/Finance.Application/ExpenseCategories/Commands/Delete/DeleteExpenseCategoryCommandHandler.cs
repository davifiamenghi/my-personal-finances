namespace Finance.Application.Expenses.Commands.Delete
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;

    public class DeleteExpenseCategoryCommandHandler : IRequestHandler<DeleteExpenseCategoryCommand>
    {
        private const string ExpenseCategory = "Expense-Category";

        private readonly IFinanceDbContext context;

        public DeleteExpenseCategoryCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(DeleteExpenseCategoryCommand request, CancellationToken cancellationToken)
        {
            var expenseCategory = await this.context.ExpenseCategories.FindAsync(request.Id);

            if (expenseCategory == null)
            {
                throw new NotFoundException(ExpenseCategory, request.Id);
            }

            this.context.ExpenseCategories.Remove(expenseCategory);
            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
