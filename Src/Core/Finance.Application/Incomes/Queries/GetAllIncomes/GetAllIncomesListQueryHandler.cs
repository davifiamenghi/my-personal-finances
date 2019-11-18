namespace Finance.Application.Incomes.Queries.GetAllIncomes
{
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Application.Common.Interfaces;
    using System.Linq;

    public class GetAllIncomesListQueryHandler : IRequestHandler<GetAllIncomesListQuery, IncomesListViewModel>
    {
        private readonly IFinanceDbContext context;
        private readonly IMapper mapper;

        public GetAllIncomesListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<IncomesListViewModel> Handle(GetAllIncomesListQuery request, CancellationToken cancellationToken)
        {
            return new IncomesListViewModel
            {
                 Incomes = await context.Incomes
                    .Where(x => x.Date.Month == request.Month && x.Date.Year == request.Year && x.UserId == request.UserId)
                    .OrderByDescending(x => x.CreatedOn)
                    .Include(x => x.Category)
                    .ProjectTo<IncomeAllViewModel>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}