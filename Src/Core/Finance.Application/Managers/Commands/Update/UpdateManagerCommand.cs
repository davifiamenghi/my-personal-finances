namespace Finance.Application.Managers.Commands.Update
{
    using MediatR;

    public class UpdateManagerCommand : IRequest
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ReceptionDay { get; set; }
    }
}
