namespace Finance.Application.Expenses.Commands.Create
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Domain.Entities;
    using Common.Exceptions;
    using Common.Interfaces;

    public class CreateExpenseCommandHandler : IRequestHandler<CreateExpenseCommand, Unit>
    {
        private const string User = "User";
        private const string Category = "Category";
        private const string ErrorMessage = "Cannot create entity of type Expense, because {0} does not exsists.";

        private readonly IFinanceDbContext context;

        public CreateExpenseCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
        {
            var user = await this.context.FinanceUsers.FindAsync(request.UserId);

            if (user == null)
            {
                throw new CreateFailureException(User, request.UserId, string.Format(ErrorMessage, User));
            }

            var category = await this.context.ExpenseCategories.FindAsync(request.CategoryId);

            if (category == null)
            {
                throw new CreateFailureException(Category, request.CategoryId, string.Format(ErrorMessage, Category));
            }

            var expense = new Expense
            {
                Merchant = request.Merchant,
                Date = DateTime.Parse(request.Date),
                Note = request.Note,
                Total = request.Total,
                UserId = request.UserId,
                CategoryId = request.CategoryId,
                CreatedOn = DateTime.UtcNow
            };

            this.context.Expenses.Add(expense);

            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
