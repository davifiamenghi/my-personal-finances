namespace Finance.Application.Incomes.Commands.Delete
{
    using MediatR;

    public class DeleteIncomeCategoryCommand : IRequest
    {
        public string Id { get; set; }
    }
}
