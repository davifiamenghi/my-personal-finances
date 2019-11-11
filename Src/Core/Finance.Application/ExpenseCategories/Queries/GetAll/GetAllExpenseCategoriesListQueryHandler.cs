namespace Finance.Application.ExpenseCategories.Queries.GetAll
{
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Finance.Application.Common.Interfaces;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetAllExpenseCategoriesListQueryHandler : IRequestHandler<GetAllExpenseCategoriesListQuery, ExpenseCategoriesListViewModel>
    {
        private readonly IFinanceDbContext context;
        private readonly IMapper mapper;

        public GetAllExpenseCategoriesListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ExpenseCategoriesListViewModel> Handle(GetAllExpenseCategoriesListQuery request, CancellationToken cancellationToken)
        {
            return new ExpenseCategoriesListViewModel
            {
                Categories = await this.context.ExpenseCategories.ProjectTo<ExpenseCategoryAllViewModel>(this.mapper.ConfigurationProvider).ToListAsync(cancellationToken)
            };
        }
    }
}
