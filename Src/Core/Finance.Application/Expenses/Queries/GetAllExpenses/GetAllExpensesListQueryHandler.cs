namespace Finance.Application.Expenses.Queries.GetAllExpenses
{
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Application.Common.Interfaces;
    using System.Linq;

    public class GetAllExpensesListQueryHandler : IRequestHandler<GetAllExpensesListQuery, ExpensesListViewModel>
    {
        private readonly IFinanceDbContext context;
        private readonly IMapper mapper;

        public GetAllExpensesListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ExpensesListViewModel> Handle(GetAllExpensesListQuery request, CancellationToken cancellationToken)
        {
            return new ExpensesListViewModel
            {
                Expenses = await context.Expenses
                    .Where(x => x.Date.Month == request.Month && x.Date.Year == request.Year)
                    .OrderByDescending(x => x.CreatedOn)
                    .Include(x => x.Category)
                    .ProjectTo<ExpenseAllViewModel>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}