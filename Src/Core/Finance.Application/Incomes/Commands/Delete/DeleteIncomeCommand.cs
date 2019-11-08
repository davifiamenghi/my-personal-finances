namespace Finance.Application.Incomes.Commands.Delete
{
    using MediatR;

    public class DeleteIncomeCommand : IRequest
    {
        public string Id { get; set; }
    }
}
