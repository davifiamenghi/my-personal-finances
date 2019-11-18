namespace Finance.Application.Incomes.Queries.GetTotalIncomesByYear
{
    using System.Collections.Generic;

    public class IncomesByYearListViewModel
    {
        public IList<IncomeByYearViewModel> IncomeSums { get; set; }

        public decimal Totals { get; set; }
    }
}
