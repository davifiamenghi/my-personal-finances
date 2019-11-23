namespace Finance.Application.Expenses.Queries.GetAllExpenses
{
    using Finance.Common.GlobalContants;
    using FluentValidation;

    public class GetAllExpensesListQueryValidator : AbstractValidator<GetAllExpensesListQuery>
    {
        public GetAllExpensesListQueryValidator()
        {
            RuleFor(e => e.Month)
                .GreaterThan(ApplicationConstants.MinMonth)
                .LessThanOrEqualTo(ApplicationConstants.MaxMonth)
                .WithMessage(string.Format(ApplicationConstants.ValueErrorMessage, ApplicationConstants.Month));


            RuleFor(e => e.Year)
                .GreaterThan(ApplicationConstants.MinYear)
                .LessThanOrEqualTo(ApplicationConstants.MaxYear)
                .WithMessage(string.Format(ApplicationConstants.ValueErrorMessage, ApplicationConstants.Year));


            RuleFor(e => e.UserId)
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.User));
        }
    }
}