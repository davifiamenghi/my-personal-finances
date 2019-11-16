namespace Finance.Application.Incomes.Queries.GetIncomeById
{
    using MediatR;

    public class GetIncomeByIdQuery : IRequest<IncomeViewModel>
    {
        public string Id { get; set; }
    }
}
