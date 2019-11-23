namespace Finance.Application.Incomes.Commands.Create
{
    using Finance.Common.GlobalContants;
    using FluentValidation;

    public class CreateIncomeCategoryCommandValidator : AbstractValidator<CreateIncomeCategoryCommand>
    {
        public CreateIncomeCategoryCommandValidator()
        {
            RuleFor(e => e.Name)
                .MaximumLength(ApplicationConstants.NameMaxLength)
                .NotNull()
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.CategoryName));

            RuleFor(e => e.TypeId)
                .NotNull()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.Type))
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.Type));
            

            RuleFor(e => e.UserId)
                .NotNull()
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.User));            
        }
    }
}
