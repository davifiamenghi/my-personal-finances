namespace Finance.Application.Incomes.Queries.GetTotalIncomesByYear
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using Finance.Application.Common.Interfaces;
    using Finance.Common.GlobalContants;
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
            var incomes = await context.Incomes
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

            var totalIncomes = incomes.Sum(e => e.Sum);

            var fullIncomes = new List<IncomeByYearViewModel>();

            for (int i = 1; i <= ApplicationConstants.MaxMonth; i++)
            {
                var income = incomes.FirstOrDefault(income => income.Month == i);

                if (income != null)
                {
                    fullIncomes.Add(income);
                }
                else
                {
                    var zeroIncome = new IncomeByYearViewModel
                    {
                        Month = i,
                        Sum = 0.00M
                    };

                    fullIncomes.Add(zeroIncome);
                }
            }

            return new IncomesByYearListViewModel
            {
                IncomeSums = fullIncomes,
                Totals = totalIncomes
            };
        }
    }
}
