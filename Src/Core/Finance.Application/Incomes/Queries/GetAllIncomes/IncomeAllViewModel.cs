namespace Finance.Application.Incomes.Queries.GetAllIncomes
{
    using AutoMapper;
    using Interfaces.Mapping;
    using Domain.Entities;

    public class IncomeAllViewModel : IHaveCustomMapping
    {
        public string Id { get; set; }

        public string Merchant { get; set; }

        public string Date { get; set; }

        public decimal Total { get; set; }
        
        public string Category { get; set; }

        public string Note { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Income, IncomeAllViewModel>()
                .ForMember(x => x.Date, y => y.MapFrom(src => src.Date.ToShortDateString()))
                .ForMember(x => x.Category, y => y.MapFrom(src => src.Category.Name));
        }
    }
}