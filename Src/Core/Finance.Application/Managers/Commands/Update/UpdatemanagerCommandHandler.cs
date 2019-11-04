namespace Finance.Application.Managers.Commands.Update
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Microsoft.EntityFrameworkCore;

    using Common.Exceptions;
    using Common.Interfaces;
    using Domain.Enumerations;
    using Domain.ValueObjects;

    public class UpdateManagerCommandHandler : IRequestHandler<UpdateManagerCommand, Unit>
    {
        private const string Entity = "Manager";
        private readonly IFinanceDbContext context;

        public UpdateManagerCommandHandler(IFinanceDbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(UpdateManagerCommand request, CancellationToken cancellationToken)
        {
            var manager = await this.context.Managers
                .SingleOrDefaultAsync(m => m.Id == request.Id && m.IsDeleted != true, cancellationToken);

            if (manager == null)
            {
                throw new NotFoundException(Entity, request.Id);
            }
            
            manager.FirstName = request.FirstName;
            manager.LastName = request.LastName;
            manager.ReceptionDay = Enum.Parse<WeekDay>(request.ReceptionDay);
            manager.ModifiedOn = DateTime.UtcNow;

            this.context.Managers.Update(manager);

            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
