namespace Finance.Infrastructure
{
    using Microsoft.Extensions.DependencyInjection;

    using Application.Common.Interfaces;
    using Common.Interfaces;
    using Microsoft.Extensions.Configuration;

    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<IDateTime, MachineDateTime>();

            return services;
        }
    }
}