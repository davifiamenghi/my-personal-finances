namespace Finance.Application.Incomes.Commands.Update
{
    using System;
    using FluentValidation;

    public class UpdateIncomeCommandValidator : AbstractValidator<UpdateIncomeCommand>
    {
        private const int MerchatMaxLength = 50;
        private const int NoteMaxLength = 200;

        public UpdateIncomeCommandValidator()
        {
            RuleFor(e => e.Id)
                .NotEmpty();

            RuleFor(e => e.Merchant)
                .MaximumLength(MerchatMaxLength);

            RuleFor(e => e.Note)
                .MaximumLength(NoteMaxLength);

            RuleFor(e => e.Date)
                .NotEmpty()
                .Must(BeValidDate);

            RuleFor(e => e.CategoryId)
                .NotEmpty();

            RuleFor(e => e.UserId)
                .NotEmpty();
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
