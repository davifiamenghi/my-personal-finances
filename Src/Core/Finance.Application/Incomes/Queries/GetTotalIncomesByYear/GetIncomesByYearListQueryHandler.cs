namespace Finance.Application.Incomes.Queries.GetTotalIncomesByYear
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using Finance.Application.Common.Interfaces;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetIncomesByYearListQueryHandler : IRequestHandler<GetIncomesByYearListQuery, IncomesByYearListViewModel>
    {
        private readonly IFinanceDbContext context;

        public GetIncomesByYearListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
        }

        public async Task<IncomesByYearListViewModel> Handle(GetIncomesByYearListQuery request, CancellationToken cancellationToken)
        {
            var Incomes = await context.Incomes
                    .Where(e => e.Date.Year == request.Year && e.UserId == request.UserId)
                    .GroupBy(e => new { 
                        Month = e.Date.Month
                    })
                    .Select(eg => new IncomeByYearViewModel
                    {
                        Month = eg.Key.Month,
                        Sum = eg.Sum(e => e.Total)
                    })
                    .OrderBy(e => e.Month)
                    .ToListAsync(cancellationToken);

            var totalIncomes = Incomes.Sum(e => e.Sum);

            return new IncomesByYearListViewModel
            {
                IncomeSums = Incomes,
                Totals = totalIncomes
            };
        }
    }
}
