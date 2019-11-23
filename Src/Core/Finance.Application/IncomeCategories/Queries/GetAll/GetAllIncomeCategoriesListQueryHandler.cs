namespace Finance.Application.IncomeCategories.Queries.GetAll
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Finance.Application.Common.Interfaces;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetAllIncomeCategoriesListQueryHandler : IRequestHandler<GetAllIncomeCategoriesListQuery, IncomeCategoriesListViewModel>
    {
        private readonly IFinanceDbContext context;
        private readonly IMapper mapper;

        public GetAllIncomeCategoriesListQueryHandler(IFinanceDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<IncomeCategoriesListViewModel> Handle(GetAllIncomeCategoriesListQuery request, CancellationToken cancellationToken)
        {
            return new IncomeCategoriesListViewModel
            {
                Categories = await this.context.IncomeCategories
                    .Where(ic => ic.UserId == request.UserId)
                    .OrderBy(ec => ec.TypeId)
                    .ThenBy(ec => ec.Name)
                    .ProjectTo<IncomeCategoryAllViewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
