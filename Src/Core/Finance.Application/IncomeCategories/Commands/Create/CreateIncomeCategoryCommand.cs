namespace Finance.Application.Incomes.Commands.Create
{
    using MediatR;

    public class CreateIncomeCategoryCommand : IRequest
    {
        public string Name { get; set; }

        public int TypeId { get; set; }
        
        public string UserId { get; set; }
    }
}
