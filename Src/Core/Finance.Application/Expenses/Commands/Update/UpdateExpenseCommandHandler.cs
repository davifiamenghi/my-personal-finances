namespace Finance.Application.Expenses.Commands.Update
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;

    public class UpdateExpenseCommandHandler : IRequestHandler<UpdateExpenseCommand, Unit>
    {
        private const string User = "User";
        private const string Category = "Category";
        private const string Expense = "Expense";
        private const string ErrorMessage = "Cannot update entity of type Expense, because {0} does not exsists.";

        private readonly IFinanceDbContext context;

        public UpdateExpenseCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(UpdateExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = await this.context.Expenses.FindAsync(request.Id);

            if (expense == null)
            {
                throw new UpdateFailureException(Expense, request.UserId, string.Format(ErrorMessage, Expense));
            }

            var user = await this.context.FinanceUsers.FindAsync(request.UserId);

            if (user == null)
            {
                throw new UpdateFailureException(User, request.UserId, string.Format(ErrorMessage, User));
            }

            var category = await this.context.ExpenseCategories.FindAsync(request.CategoryId);

            if (category == null)
            {
                throw new CreateFailureException(Category, request.CategoryId, string.Format(ErrorMessage, Category));
            }


            expense.Merchant = request.Merchant;
            expense.Date = DateTime.Parse(request.Date);
            expense.Total = request.Total;
            expense.Note = request.Note;
            expense.UserId = request.UserId;
            expense.CategoryId = request.CategoryId;
            expense.ModifiedOn = DateTime.UtcNow;

            this.context.Expenses.Update(expense);

            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;

        }
    }
}
