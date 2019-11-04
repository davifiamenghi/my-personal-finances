namespace Finance.Application.Managers.Queries.GetManagerById
{
    using MediatR;

    public class GetManagerByIdQuery : IRequest<ManagerViewModel>
    {
        public string Id { get; set; }
    }
}