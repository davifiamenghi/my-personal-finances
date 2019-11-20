namespace Finance.Application.CashflowTypes.Queries.GetAll
{
    using AutoMapper;

    using Domain.Entities;
    using Interfaces.Mapping;

    public class CashflowTypeAllViewModel : IHaveCustomMapping
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<CashflowType, CashflowTypeAllViewModel>();
        }
    }
}
