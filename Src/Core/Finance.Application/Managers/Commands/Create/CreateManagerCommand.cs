namespace Finance.Application.Managers.Commands.Create
{
    using MediatR;

    public class CreateManagerCommand : IRequest
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ReceptionDay { get; set; }
    }
}
