namespace Finance.Application.Expenses.Commands.Create
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Domain.Entities;
    using Common.Exceptions;
    using Common.Interfaces;

    public class CreateExpenseCategoryCommandHandler : IRequestHandler<CreateExpenseCategoryCommand, Unit>
    {
        private const string User = "User";
        private const string Type = "Cashflow Type";
        private const string ErrorMessage = "Cannot create entity of type Expense, because {0} does not exsists.";

        private readonly IFinanceDbContext context;

        public CreateExpenseCategoryCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(CreateExpenseCategoryCommand request, CancellationToken cancellationToken)
        {
            var user = await this.context.FinanceUsers.FindAsync(request.UserId);

            if (user == null)
            {
                throw new CreateFailureException(User, request.UserId, string.Format(ErrorMessage, User));
            }

            var type = await this.context.CashflowTypes.FindAsync(request.TypeId);

            if (type == null)
            {
                throw new CreateFailureException(Type, request.TypeId, string.Format(ErrorMessage, Type));
            }

            var expenseCategory = new ExpenseCategory
            {
                Name = request.Name,
                UserId = request.UserId,
                TypeId = request.TypeId,
                CreatedOn = DateTime.UtcNow
            };

            this.context.ExpenseCategories.Add(expenseCategory);

            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
