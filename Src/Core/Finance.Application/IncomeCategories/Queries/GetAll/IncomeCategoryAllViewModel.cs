namespace Finance.Application.IncomeCategories.Queries.GetAll
{
    using AutoMapper;

    using Domain.Entities;
    using Interfaces.Mapping;

    public class IncomeCategoryAllViewModel : IHaveCustomMapping
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<IncomeCategory, IncomeCategoryAllViewModel>();
        }
    }
}
