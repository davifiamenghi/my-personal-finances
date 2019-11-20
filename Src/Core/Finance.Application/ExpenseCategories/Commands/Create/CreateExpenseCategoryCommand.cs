namespace Finance.Application.Expenses.Commands.Create
{
    using MediatR;

    public class CreateExpenseCategoryCommand : IRequest
    {
        public string Name { get; set; }

        public int TypeId { get; set; }
        
        public string UserId { get; set; }
    }
}
