namespace Finance.Application.Expenses.Commands.Create
{
    using Finance.Common.GlobalContants;
    using FluentValidation;

    public class CreateExpenseCategoryCommandValidator : AbstractValidator<CreateExpenseCategoryCommand>
    {
        public CreateExpenseCategoryCommandValidator()
        {
            RuleFor(e => e.Name)
                .MaximumLength(ApplicationConstants.NameMaxLength)
                .NotNull()
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.CategoryName));

            RuleFor(e => e.TypeId)
                .NotNull()
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.Type));


            RuleFor(e => e.UserId)
                .NotNull()
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.User));
        }
    }
}
