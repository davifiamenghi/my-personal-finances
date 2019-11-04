namespace Finance.Application.Common.Interfaces
{
    using System.Threading.Tasks;
    using Notifications;

    public interface INotificationService
    {
        Task SendAsync(MessageDto message);
    }
}