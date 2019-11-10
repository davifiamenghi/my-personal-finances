namespace Finance.Application.Expenses.Queries.GetAllExpenses
{
    using System.Collections.Generic;

    public class ExpensesListViewModel
    {
        public IList<ExpenseAllViewModel> Expenses { get; set; }
    }
}