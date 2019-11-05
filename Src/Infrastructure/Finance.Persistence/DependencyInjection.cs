namespace Finance.Persistence
{
    using Application.Common.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FinanceDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("FinanceDbConnection"), b => b.MigrationsAssembly("Finance.Infrastructure")));

            services.AddScoped<IFinanceDbContext>(provider => provider.GetService<FinanceDbContext>());
             
            return services;
        }
    }
}