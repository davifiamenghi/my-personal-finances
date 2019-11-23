namespace Finance.Application.Incomes.Commands.Create
{
    using System;
    using Finance.Common.GlobalContants;
    using FluentValidation;

    public class CreateIncomeCommandValidator : AbstractValidator<CreateIncomeCommand>
    {
        public CreateIncomeCommandValidator()
        {
            RuleFor(e => e.Merchant)
                .MaximumLength(ApplicationConstants.MerchatMaxLength)
                .WithMessage(string.Format(ApplicationConstants.LengthErrorMessage, ApplicationConstants.Merchant, ApplicationConstants.MerchatMaxLength));

            RuleFor(e => e.Note)
                .MaximumLength(ApplicationConstants.NoteMaxLength)
                .WithMessage(string.Format(ApplicationConstants.LengthErrorMessage, ApplicationConstants.Note, ApplicationConstants.NoteMaxLength));

            RuleFor(e => e.Date)
                .NotEmpty()
                .Must(BeValidDate)
                .WithMessage(string.Format(ApplicationConstants.InvalidErrorMessage, ApplicationConstants.Date));

            RuleFor(e => e.Total)
                .GreaterThan(ApplicationConstants.MinimumTotal)
                .WithMessage(string.Format(ApplicationConstants.ValueErrorMessage, ApplicationConstants.Total));


            RuleFor(e => e.CategoryId)
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.Category));


            RuleFor(e => e.UserId)
                .NotEmpty()
                .WithMessage(string.Format(ApplicationConstants.EmptyErrorMessage, ApplicationConstants.User));
        }

        private bool BeValidDate(string date)
        {
            var parsedDate = new DateTime();

            if (DateTime.TryParse(date, out parsedDate))
            {
                return true;
            }

            return false;
        }
    }
}
