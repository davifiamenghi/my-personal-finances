namespace Finance.Application.IncomeCategories.Queries.GetAll
{
    using MediatR;

    public class GetAllIncomeCategoriesListQuery : IRequest<IncomeCategoriesListViewModel>
    {
        public string UserId { get; set; }
    }
}
