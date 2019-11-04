namespace Finance.Infrastructure
{
    using System.Threading.Tasks;
    
    using Application.Common.Interfaces;
    using Application.Notifications;

    public class NotificationService : INotificationService
    {
        public Task SendAsync(MessageDto message)
        {
            return Task.CompletedTask;
        }
    }
}