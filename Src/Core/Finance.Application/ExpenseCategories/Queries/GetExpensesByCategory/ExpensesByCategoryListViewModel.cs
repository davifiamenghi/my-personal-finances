namespace Finance.Application.ExpenseCategories.Queries.GetExpensesByCategory
{
    using System.Collections.Generic;

    public class ExpensesByCategoryListViewModel
    {
        public IList<ExpenseByCategoryViewModel> ExpenseCategories { get; set; }

        public decimal Totals { get; set; }
    }
}
