namespace Finance.Application.Incomes.Commands.Delete
{
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;
    using System.Linq;

    public class DeleteIncomeCategoryCommandHandler : IRequestHandler<DeleteIncomeCategoryCommand>
    {
        private const string IncomeCategory = "Income-Category";
        private const string Incomes = "incomes";
        private const string ErrorMessage = "Cannot delete {0}, because there are existing {1} connected with this category.";

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

            if (incomeCategory.Incomes.Any())
            {
                throw new DeleteFailureException(IncomeCategory, request.Id, string.Format(ErrorMessage, incomeCategory.Name, Incomes));
            }

            this.context.IncomeCategories.Remove(incomeCategory);
            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
