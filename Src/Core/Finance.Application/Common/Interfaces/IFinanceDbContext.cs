namespace Finance.Application.Common.Interfaces
{        
    using Microsoft.EntityFrameworkCore;

    using Domain.Entities;
    using global::System.Threading.Tasks;
    using global::System.Threading;

    public interface IFinanceDbContext
    {
         DbSet<Manager> Managers { get; set; }

         Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}