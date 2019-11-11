namespace Finance.Application.ExpenseCategories.Queries.GetAll
{
    using System.Collections.Generic;

    public class ExpenseCategoriesListViewModel
    {
        public IList<ExpenseCategoryAllViewModel> Categories { get; set; }
    }
}
