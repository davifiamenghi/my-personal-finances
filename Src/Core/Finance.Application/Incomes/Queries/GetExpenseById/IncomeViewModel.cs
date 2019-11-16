namespace Finance.Application.Incomes.Queries.GetIncomeById
{    
    using System;
    using System.Linq.Expressions;
    using Domain.Entities;

    public class IncomeViewModel
    {
        public string Id { get; set; }

        public string Merchant { get; set; }

        public DateTime Date { get; set; }

        public decimal Total { get; set; }

        public string Note { get; set; }

        public string CategoryId { get; set; }

        public string CategoryName { get; set; }

        public static Expression<Func<Income, IncomeViewModel>> Projection
        {
            get
            {
                return income => new IncomeViewModel
                {
                    Id = income.Id,
                    Merchant = income.Merchant,
                    Date = income.Date,
                    Total = income.Total,
                    Note = income.Note,
                    CategoryId = income.CategoryId,
                    CategoryName = income.Category.Name
                };
            }
        }

        public static IncomeViewModel Create(Income income)
        {
            return Projection.Compile().Invoke(income);
        }
    }
}
