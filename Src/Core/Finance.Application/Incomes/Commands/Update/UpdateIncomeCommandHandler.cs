namespace Finance.Application.Incomes.Commands.Update
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;

    public class UpdateIncomeCommandHandler : IRequestHandler<UpdateIncomeCommand, Unit>
    {
        private const string User = "User";
        private const string Category = "Category";
        private const string Income = "Income";
        private const string ErrorMessage = "Cannot update entity of type Income, because {0} does not exsists.";

        private readonly IFinanceDbContext context;

        public UpdateIncomeCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(UpdateIncomeCommand request, CancellationToken cancellationToken)
        {
            var income = await this.context.Incomes.FindAsync(request.Id);

            if (income == null)
            {
                throw new UpdateFailureException(Income, request.UserId, string.Format(ErrorMessage, Income));
            }

            var user = await this.context.FinanceUsers.FindAsync(request.UserId);

            if (user == null)
            {
                throw new UpdateFailureException(User, request.UserId, string.Format(ErrorMessage, User));
            }

            var category = await this.context.IncomeCategories.FindAsync(request.CategoryId);

            if (category == null)
            {
                throw new CreateFailureException(Category, request.CategoryId, string.Format(ErrorMessage, Category));
            }


            income.Merchant = request.Merchant;
            income.Date = DateTime.Parse(request.Date);
            income.Note = request.Note;
            income.UserId = request.UserId;
            income.Total = request.Total;
            income.CategoryId = request.CategoryId;
            income.ModifiedOn = DateTime.UtcNow;

            this.context.Incomes.Update(income);

            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;

        }
    }
}
