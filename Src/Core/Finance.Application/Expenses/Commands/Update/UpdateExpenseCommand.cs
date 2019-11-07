namespace Finance.Application.Expenses.Commands.Update
{
    using MediatR;

    public class UpdateExpenseCommand : IRequest
    {
        public string Id { get; set; }

        public string Merchant { get; set; }

        public string Date { get; set; }

        public string Note { get; set; }

        public string CategoryId { get; set; }

        public string UserId { get; set; }
    }
}
