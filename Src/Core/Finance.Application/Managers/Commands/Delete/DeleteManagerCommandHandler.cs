namespace Finance.Application.Managers.Commands.Delete
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Common.Exceptions;
    using Common.Interfaces;

    public class DeleteManagerCommandHandler : IRequestHandler<DeleteManagerCommand>
    {
        private const string Entity = "Manager";

        private readonly IFinanceDbContext context;

        public DeleteManagerCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(DeleteManagerCommand request, CancellationToken cancellationToken)
        {
            var manager = await this.context.Managers
                .FindAsync(request.Id);

            if (manager == null || manager.IsDeleted == true)
            {
                throw new NotFoundException(Entity, request.Id);
            }

            manager.DeletedOn = DateTime.UtcNow;
            manager.IsDeleted = true;

            this.context.Managers.Update(manager);
            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
