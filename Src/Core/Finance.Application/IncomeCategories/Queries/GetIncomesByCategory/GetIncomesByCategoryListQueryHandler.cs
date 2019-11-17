namespace Finance.Application.IncomeCategories.Queries.GetIncomesByCategory
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using Finance.Application.Common.Interfaces;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetIncomesByCategoryListQueryHandler : IRequestHandler<GetIncomesByCategoryListQuery, IncomesByCategoryListViewModel>
    {
        private readonly IFinanceDbContext context;

        public GetIncomesByCategoryListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
        }

        public async Task<IncomesByCategoryListViewModel> Handle(GetIncomesByCategoryListQuery request, CancellationToken cancellationToken)
        {
            var incomeCategories = await this.context.IncomeCategories
                    .Include(ec => ec.Incomes)
                    .Include(ex => ex.Type)
                    .Select(ec => new IncomeByCategoryViewModel
                    {
                        Id = ec.Id,
                        Name = ec.Name,
                        TypeId = ec.TypeId,
                        TypeDescription = ec.Type.Description,
                        Sum = ec.Incomes.Where(e => e.Date.Month == request.Month && e.Date.Year == request.Year && e.UserId == request.UserId).Sum(e => e.Total)
                    })
                    .OrderBy(ec => ec.TypeId)
                    .ToListAsync(cancellationToken);

            var totalIncomes = incomeCategories.Sum(e => e.Sum);
            
            return new IncomesByCategoryListViewModel
            {
                IncomeCategories = incomeCategories,
                Totals = totalIncomes
            };
        }
    }
}
