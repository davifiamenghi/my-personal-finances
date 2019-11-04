namespace Finance.Application.Managers.Queries.GetAllManagers
{
    using AutoMapper;

    using Domain.Entities;
    using Interfaces.Mapping;

    public class ManagerAllViewModel : IHaveCustomMapping
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ReceptionDay { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Manager, ManagerAllViewModel>();
        }
    }
}