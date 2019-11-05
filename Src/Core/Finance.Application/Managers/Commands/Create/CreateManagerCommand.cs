namespace Finance.Application.Managers.Commands.Create
{
    using MediatR;

    public class CreateExpenceCommand : IRequest
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ReceptionDay { get; set; }
    }
}
