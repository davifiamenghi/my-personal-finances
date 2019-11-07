namespace Finance.Persistence
{
    using Application.Common.Interfaces;
    using Finance.Domain.Entities;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FinanceDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("FinanceDbConnection")));

            services.AddDefaultIdentity<FinanceUser>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
            })
                .AddRoles<FinanceRole>()
                .AddEntityFrameworkStores<FinanceDbContext>();

            services.AddIdentityServer()
                    .AddApiAuthorization<FinanceUser, FinanceDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddScoped<IFinanceDbContext>(provider => provider.GetService<FinanceDbContext>());
             
            return services;
        }
    }
}