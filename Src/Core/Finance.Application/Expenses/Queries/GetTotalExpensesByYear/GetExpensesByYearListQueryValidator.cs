namespace Finance.Application.Expenses.Queries.GetTotalExpensesByYear
{
    using Finance.Common.GlobalContants;
    using FluentValidation;

    public class GetExpensesByYearListQueryValidator : AbstractValidator<GetExpensesByYearListQuery>
    {
        public GetExpensesByYearListQueryValidator()
        {
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