namespace Finance.Application.Expenses.Queries.GetTotalExpensesByYear
{
    using System.Globalization;

    public class ExpenseByYearViewModel
    {
        public int Month { get; set; }

        public string MonthName
        {
            get
            {
                return CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(this.Month);
            }
        }

        public decimal Sum { get; set; }
    }
}
