namespace Finance.Application.Incomes.Commands.Delete
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;

    public class DeleteIncomeCategoryCommandHandler : IRequestHandler<DeleteIncomeCategoryCommand>
    {
        private const string IncomeCategory = "Income-Category";

        private readonly IFinanceDbContext context;

        public DeleteIncomeCategoryCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(DeleteIncomeCategoryCommand request, CancellationToken cancellationToken)
        {
            var incomeCategory = await this.context.IncomeCategories.FindAsync(request.Id);

            if (incomeCategory == null)
            {
                throw new NotFoundException(IncomeCategory, request.Id);
            }

            this.context.IncomeCategories.Remove(incomeCategory);
            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
