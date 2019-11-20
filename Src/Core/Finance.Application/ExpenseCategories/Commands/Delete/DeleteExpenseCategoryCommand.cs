﻿namespace Finance.Application.Expenses.Commands.Delete
{
    using MediatR;

    public class DeleteExpenseCategoryCommand : IRequest
    {
        public string Id { get; set; }
    }
}
