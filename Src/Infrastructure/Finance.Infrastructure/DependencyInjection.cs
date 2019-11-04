namespace Finance.Infrastructure
{
    using Microsoft.Extensions.DependencyInjection;

    using Microsoft.AspNetCore.Authentication;

    using Application.Common.Interfaces;
    using Common.Interfaces;
    using Domain.Entities;
    using Identity;
    using Persistence;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserManager, UserManagerService>();
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<IDateTime, MachineDateTime>();

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("FinanceDbConnection")));

            services.AddDefaultIdentity<ApplicationUser>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer()
                    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            return services;
        }
    }
}