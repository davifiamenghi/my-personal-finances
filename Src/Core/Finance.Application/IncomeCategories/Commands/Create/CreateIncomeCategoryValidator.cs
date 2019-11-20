namespace Finance.Application.Incomes.Commands.Create
{
    using FluentValidation;

    public class CreateIncomeCategoryCommandValidator : AbstractValidator<CreateIncomeCategoryCommand>
    {
        private const int NameMaxLength = 20;

        public CreateIncomeCategoryCommandValidator()
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
