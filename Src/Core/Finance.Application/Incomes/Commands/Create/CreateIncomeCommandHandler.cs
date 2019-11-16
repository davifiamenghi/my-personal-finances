namespace Finance.Application.Incomes.Commands.Create
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Domain.Entities;
    using Common.Exceptions;
    using Common.Interfaces;

    public class CreateIncomeCommandHandler : IRequestHandler<CreateIncomeCommand, Unit>
    {
        private const string User = "User";
        private const string Category = "Category";
        private const string ErrorMessage = "Cannot create entity of type Income, because {0} does not exsists.";

        private readonly IFinanceDbContext context;

        public CreateIncomeCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(CreateIncomeCommand request, CancellationToken cancellationToken)
        {
            var user = await this.context.FinanceUsers.FindAsync(request.UserId);

            if (user == null)
            {
                throw new CreateFailureException(User, request.UserId, string.Format(ErrorMessage, User));
            }

            var category = await this.context.IncomeCategories.FindAsync(request.CategoryId);

            if (category == null)
            {
                throw new CreateFailureException(Category, request.CategoryId, string.Format(ErrorMessage, Category));
            }

            var income = new Income
            {
                Merchant = request.Merchant,
                Date = DateTime.Parse(request.Date),
                Note = request.Note,
                Total = request.Total,
                UserId = request.UserId,
                CategoryId = request.CategoryId,
                CreatedOn = DateTime.UtcNow
            };

            this.context.Incomes.Add(income);

            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
