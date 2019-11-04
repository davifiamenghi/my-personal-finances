namespace Finance.WebApp.Infrastructure
{
    using Microsoft.AspNetCore.Builder;

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseEndpointsWithAreas(this IApplicationBuilder app)
            => app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapControllers();
                endpoints.MapRazorPages();
            });
    }
}