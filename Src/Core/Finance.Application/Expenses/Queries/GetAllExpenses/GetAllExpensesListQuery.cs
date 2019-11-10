namespace Finance.Application.Expenses.Queries.GetAllExpenses
{
    using MediatR;

    public class GetAllExpensesListQuery : IRequest<ExpensesListViewModel>
    {
    }
}