namespace Finance.Application.Expenses.Queries.GetTotalExpensesByYear
{
    using MediatR;

    public class GetExpensesByYearListQuery : IRequest<ExpensesByYearListViewModel>
    {
        public int Year { get; set; }

        public string UserId { get; set; }
    }
}
