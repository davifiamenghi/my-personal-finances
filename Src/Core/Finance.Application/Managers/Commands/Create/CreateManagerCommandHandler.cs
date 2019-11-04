namespace Finance.Application.Managers.Commands.Create
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using MediatR;

    using Domain.Entities;
    using Domain.Enumerations;
    using Finance.Application.Common.Interfaces;

    public class CreateManagerCommandHandler : IRequestHandler<CreateManagerCommand, Unit>
    {
        private readonly IFinanceDbContext context;
        private readonly IMediator mediator;

        public CreateManagerCommandHandler(IFinanceDbContext context, IMediator mediator)
        {
            this.context = context;
            this.mediator = mediator;
        }

        public async Task<Unit> Handle(CreateManagerCommand request, CancellationToken cancellationToken)
        {
            var manager = new Manager
            {                
                FirstName = request.FirstName,
                LastName = request.LastName,
                ReceptionDay = Enum.Parse<WeekDay>(request.ReceptionDay),
                CreatedOn = DateTime.UtcNow,
                IsDeleted = false
            };

            this.context.Managers.Add(manager);

            await this.context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
