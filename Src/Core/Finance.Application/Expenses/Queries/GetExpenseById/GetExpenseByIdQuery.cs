namespace Finance.Application.Expenses.Queries.GetExpenseById
{
    using MediatR;

    public class GetExpenseByIdQuery : IRequest<ExpenseViewModel>
    {
        public string Id { get; set; }
    }
}
