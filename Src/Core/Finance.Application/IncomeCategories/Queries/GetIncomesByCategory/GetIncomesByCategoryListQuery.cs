namespace Finance.Application.IncomeCategories.Queries.GetIncomesByCategory
{
    using MediatR;

    public class GetIncomesByCategoryListQuery : IRequest<IncomesByCategoryListViewModel>
    {
        public int Month { get; set; }

        public int Year { get; set; }

        public string UserId { get; set; }
    }
}
