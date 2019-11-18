namespace Finance.Application.Incomes.Queries.GetTotalIncomesByYear
{
    using MediatR;

    public class GetIncomesByYearListQuery : IRequest<IncomesByYearListViewModel>
    {
        public int Year { get; set; }

        public string UserId { get; set; }
    }
}
