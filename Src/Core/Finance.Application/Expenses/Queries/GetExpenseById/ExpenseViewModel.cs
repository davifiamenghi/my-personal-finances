namespace Finance.Application.Expenses.Queries.GetExpenseById
{    
    using System;
    using System.Linq.Expressions;
    using Domain.Entities;

    public class ExpenseViewModel
    {
        public string Id { get; set; }

        public string Merchant { get; set; }

        public DateTime Date { get; set; }

        public decimal Total { get; set; }

        public string Note { get; set; }

        public string CategoryId { get; set; }

        public string CategoryName { get; set; }

        public static Expression<Func<Expense, ExpenseViewModel>> Projection
        {
            get
            {
                return expense => new ExpenseViewModel
                {
                    Id = expense.Id,
                    Merchant = expense.Merchant,
                    Date = expense.Date,
                    Total = expense.Total,
                    Note = expense.Note,
                    CategoryId = expense.CategoryId,
                    CategoryName = expense.Category.Name
                };
            }
        }

        public static ExpenseViewModel Create(Expense expense)
        {
            return Projection.Compile().Invoke(expense);
        }
    }
}
