namespace Finance.Application.Expenses.Queries.GetTotalExpensesByYear
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using Finance.Application.Common.Interfaces;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetExpensesByYearListQueryHandler : IRequestHandler<GetExpensesByYearListQuery, ExpensesByYearListViewModel>
    {
        private readonly IFinanceDbContext context;

        public GetExpensesByYearListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
        }

        public async Task<ExpensesByYearListViewModel> Handle(GetExpensesByYearListQuery request, CancellationToken cancellationToken)
        {
            var expenses = await context.Expenses
                    .Where(e => e.Date.Year == request.Year && e.UserId == request.UserId)
                    .GroupBy(e => new { 
                        Month = e.Date.Month
                    })
                    .Select(eg => new ExpenseByYearViewModel
                    {
                        Month = eg.Key.Month,
                        Sum = eg.Sum(e => e.Total)
                    })
                    .OrderBy(e => e.Month)
                    .ToListAsync(cancellationToken);

            var totalExpenses = expenses.Sum(e => e.Sum);

            return new ExpensesByYearListViewModel
            {
                ExpenseSums = expenses,
                Totals = totalExpenses
            };
        }
    }
}
