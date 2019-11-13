namespace Finance.Application.Expenses.Queries.GetAllExpenses
{
    using MediatR;

    public class GetAllExpensesListQuery : IRequest<ExpensesListViewModel>
    {
        public int Month { get; set; }

        public int Year { get; set; }
    }
}