﻿namespace Finance.Application.Incomes.Commands.Create
{
    using System;
    using FluentValidation;

    public class CreateIncomeCommandValidator : AbstractValidator<CreateIncomeCommand>
    {
        private const int MerchatMaxLength = 50;
        private const int NoteMaxLength = 200;

        public CreateIncomeCommandValidator()
        {
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
