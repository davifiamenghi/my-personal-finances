namespace Finance.Application.ExpenseCategories.Queries.GetAll
{
    using MediatR;

    public class GetAllExpenseCategoriesListQuery : IRequest<ExpenseCategoriesListViewModel>
    {
        public string UserId { get; set; }
    }
}
