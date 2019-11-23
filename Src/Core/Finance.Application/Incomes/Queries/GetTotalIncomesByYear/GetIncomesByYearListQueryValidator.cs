namespace Finance.Application.Incomes.Queries.GetTotalIncomesByYear
{
    using Finance.Common.GlobalContants;
    using FluentValidation;

    public class GetIncomesByYearListQueryValidator : AbstractValidator<GetIncomesByYearListQuery>
    {
        public GetIncomesByYearListQueryValidator()
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