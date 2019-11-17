namespace Finance.Application.ExpenseCategories.Queries.GetExpensesByCategory
{
    using MediatR;

    public class GetExpensesByCategoryListQuery : IRequest<ExpensesByCategoryListViewModel>
    {
        public int Month { get; set; }

        public int Year { get; set; }

        public string UserId { get; set; }
    }
}
