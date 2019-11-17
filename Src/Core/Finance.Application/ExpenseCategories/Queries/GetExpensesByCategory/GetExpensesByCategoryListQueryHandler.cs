namespace Finance.Application.ExpenseCategories.Queries.GetExpensesByCategory
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using Finance.Application.Common.Interfaces;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetExpensesByCategoryListQueryHandler : IRequestHandler<GetExpensesByCategoryListQuery, ExpensesByCategoryListViewModel>
    {
        private readonly IFinanceDbContext context;

        public GetExpensesByCategoryListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
        }

        public async Task<ExpensesByCategoryListViewModel> Handle(GetExpensesByCategoryListQuery request, CancellationToken cancellationToken)
        {
            var expenseCategories = await this.context.ExpenseCategories
                    .Include(ec => ec.Expenses)
                    .Include(ex => ex.Type)
                    .Select(ec => new ExpenseByCategoryViewModel
                    {
                        Id = ec.Id,
                        Name = ec.Name,
                        TypeId = ec.TypeId,
                        TypeDescription = ec.Type.Description,
                        Sum = ec.Expenses.Where(e => e.Date.Month == request.Month && e.Date.Year == request.Year && e.UserId == request.UserId).Sum(e => e.Total)
                    })
                    .OrderBy(ec => ec.TypeId)
                    .ToListAsync(cancellationToken);

            var totalExpenses = expenseCategories.Sum(e => e.Sum);
            
            return new ExpensesByCategoryListViewModel
            {
                ExpenseCategories = expenseCategories,
                Totals = totalExpenses
            };
        }
    }
}
