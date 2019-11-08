namespace Finance.Application.Incomes.Commands.Create
{
    using MediatR;

    public class CreateIncomeCommand : IRequest
    {
        public string Merchant { get; set; }

        public string Date { get; set; }

        public string Note { get; set; }

        public string CategoryId { get; set; }
        
        public string UserId { get; set; }

    }
}
