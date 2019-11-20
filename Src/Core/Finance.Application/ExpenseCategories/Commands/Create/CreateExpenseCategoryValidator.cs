namespace Finance.Application.Expenses.Commands.Create
{
    using FluentValidation;

    public class CreateExpenseCategoryCommandValidator : AbstractValidator<CreateExpenseCategoryCommand>
    {
        private const int NameMaxLength = 20;

        public CreateExpenseCategoryCommandValidator()
        {
            RuleFor(e => e.Name)
                .MaximumLength(NameMaxLength)
                .NotNull()
                .NotEmpty();

            RuleFor(e => e.UserId)
                .NotEmpty();
        }
    }
}
