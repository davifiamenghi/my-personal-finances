namespace Finance.Application.ExpenseCategories.Queries.GetAll
{
    using AutoMapper;

    using Domain.Entities;
    using Interfaces.Mapping;

    public class ExpenseCategoryAllViewModel : IHaveCustomMapping
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<ExpenseCategory, ExpenseCategoryAllViewModel>();
        }
    }
}
