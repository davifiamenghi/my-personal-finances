namespace Finance.Application.ExpenseCategories.Queries.GetAll
{
    using System.Linq;
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
                Categories = await this.context.ExpenseCategories                    
                    .Where(ec => ec.UserId == request.UserId)
                    .OrderBy(ec => ec.TypeId)
                    .ThenBy(ec => ec.Name)
                    .ProjectTo<ExpenseCategoryAllViewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
