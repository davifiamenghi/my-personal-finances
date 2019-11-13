namespace Finance.Application.Expenses.Queries.GetExpenseById
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Common.Exceptions;
    using Common.Interfaces;

    public class GetExpenseByIdQueryHandler : IRequestHandler<GetExpenseByIdQuery, ExpenseViewModel>
    {
        private const string Entity = "Expense";

        private readonly IFinanceDbContext context;

        public GetExpenseByIdQueryHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<ExpenseViewModel> Handle(GetExpenseByIdQuery request, CancellationToken cancellationToken)
        {
            var expense = await this.context.Expenses.Include(c => c.Category).SingleOrDefaultAsync(c => c.Id == request.Id);

            if (expense == null)
            {
                throw new NotFoundException(Entity, request.Id);
            }

            return ExpenseViewModel.Create(expense);
        }
    }
}
