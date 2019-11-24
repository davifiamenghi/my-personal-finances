namespace Finance.Application.Incomes.Queries.GetTotalIncomesByYear
{
    using System.Globalization;

    public class IncomeByYearViewModel
    {
        public int Month { get; set; }

        public string MonthName
        {
            get
            {
                return CultureInfo.InvariantCulture.DateTimeFormat.GetMonthName(this.Month);
            }
        }

        public decimal Sum { get; set; }
    }
}
