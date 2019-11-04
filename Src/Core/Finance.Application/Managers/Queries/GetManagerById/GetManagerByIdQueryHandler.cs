namespace Finance.Application.Managers.Queries.GetManagerById
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Common.Exceptions;
    using Common.Interfaces;

    public class GetManagerByIdQueryHandler : IRequestHandler<GetManagerByIdQuery, ManagerViewModel>
    {
        private const string Entity = "Manager";

        private readonly IFinanceDbContext context;

        public GetManagerByIdQueryHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<ManagerViewModel> Handle(GetManagerByIdQuery request, CancellationToken cancellationToken)
        {
            var manager = await this.context.Managers.SingleOrDefaultAsync(c => c.Id == request.Id);

            if (manager == null)
            {
                throw new NotFoundException(Entity, request.Id);
            }

            return ManagerViewModel.Create(manager);
        }
    }
}