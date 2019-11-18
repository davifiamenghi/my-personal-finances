namespace Finance.Application.Expenses.Queries.GetTotalExpensesByYear
{
    using System.Collections.Generic;

    public class ExpensesByYearListViewModel
    {
        public IList<ExpenseByYearViewModel> ExpenseSums { get; set; }

        public decimal Totals { get; set; }
    }
}
