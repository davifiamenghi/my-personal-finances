namespace Finance.Application.IncomeCategories.Queries.GetIncomesByCategory
{
    using System.Collections.Generic;

    public class IncomesByCategoryListViewModel
    {
        public IList<IncomeByCategoryViewModel> IncomeCategories { get; set; }

        public decimal Totals { get; set; }
    }
}
