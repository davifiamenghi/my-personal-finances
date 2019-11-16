namespace Finance.Application.Incomes.Queries.GetIncomeById
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Common.Exceptions;
    using Common.Interfaces;

    public class GetIncomeByIdQueryHandler : IRequestHandler<GetIncomeByIdQuery, IncomeViewModel>
    {
        private const string Entity = "Income";

        private readonly IFinanceDbContext context;

        public GetIncomeByIdQueryHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<IncomeViewModel> Handle(GetIncomeByIdQuery request, CancellationToken cancellationToken)
        {
            var income = await this.context.Incomes.Include(c => c.Category).SingleOrDefaultAsync(c => c.Id == request.Id);

            if (income == null)
            {
                throw new NotFoundException(Entity, request.Id);
            }

            return IncomeViewModel.Create(income);
        }
    }
}
