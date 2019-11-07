namespace Finance.Application.Expenses.Commands.Delete
{
    using MediatR;

    public class DeleteExpenseCommand : IRequest
    {
        public string Id { get; set; }
    }
}
