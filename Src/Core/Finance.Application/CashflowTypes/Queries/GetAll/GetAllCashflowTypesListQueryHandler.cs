namespace Finance.Application.CashflowTypes.Queries.GetAll
{
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Finance.Application.Common.Interfaces;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetAllCashflowTypesListQueryHandler : IRequestHandler<GetAllCashflowTypesListQuery, CashflowTypesListViewModel>
    {
        private readonly IFinanceDbContext context;
        private readonly IMapper mapper;

        public GetAllCashflowTypesListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<CashflowTypesListViewModel> Handle(GetAllCashflowTypesListQuery request, CancellationToken cancellationToken)
        {
            return new CashflowTypesListViewModel
            {
                CashflowTypes = await context.ExpenseCategories.ProjectTo<CashflowTypeAllViewModel>(mapper.ConfigurationProvider).ToListAsync(cancellationToken)
            };
        }
    }
}
