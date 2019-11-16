namespace Finance.Application.Incomes.Queries.GetAllIncomes
{
    using MediatR;

    public class GetAllIncomesListQuery : IRequest<IncomesListViewModel>
    {
        public int Month { get; set; }

        public int Year { get; set; }
    }
}