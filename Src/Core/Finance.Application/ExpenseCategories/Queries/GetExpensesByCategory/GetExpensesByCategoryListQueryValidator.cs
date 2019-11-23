namespace Finance.Application.ExpenseCategories.Queries.GetExpensesByCategory
{
    using Finance.Common.GlobalContants;
    using FluentValidation;

    public class GetExpensesByCategoryListQueryValidator : AbstractValidator<GetExpensesByCategoryListQuery>
    {
        public GetExpensesByCategoryListQueryValidator()
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