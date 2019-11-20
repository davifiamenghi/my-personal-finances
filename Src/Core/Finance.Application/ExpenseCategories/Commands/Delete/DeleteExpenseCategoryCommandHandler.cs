namespace Finance.Application.Expenses.Commands.Delete
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;
    using System.Linq;

    public class DeleteExpenseCategoryCommandHandler : IRequestHandler<DeleteExpenseCategoryCommand>
    {
        private const string ExpenseCategory = "Expense-Category";
        private const string Expenses = "expenses";
        private const string ErrorMessage = "Cannot delete {0}, because there are existing {1} connected with this category.";

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

            if (expenseCategory.Expenses.Any())
            {
                throw new DeleteFailureException(ExpenseCategory, request.Id, string.Format(ErrorMessage, expenseCategory.Name, Expenses));
            }

            this.context.ExpenseCategories.Remove(expenseCategory);
            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
