namespace Finance.Application.ExpenseCategories.Queries.GetExpensesByCategory
{
    public class ExpenseByCategoryViewModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int TypeId { get; set; }

        public string TypeDescription { get; set; }

        public decimal ExpensesSum { get; set; }
    }
}
