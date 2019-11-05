namespace Finance.Application.Managers.Commands.Create
{
    using FluentValidation;

    public class CreateExpenceCommandValidator : AbstractValidator<CreateExpenceCommand>
    {        
        public CreateExpenceCommandValidator()
        {            
            RuleFor(c => c.FirstName)
                .MaximumLength(50)
                .NotEmpty();

            RuleFor(c => c.FirstName)
                .MaximumLength(50)
                .NotEmpty();

            RuleFor(c => c.ReceptionDay)
                .NotEmpty();
        }
    }
}
