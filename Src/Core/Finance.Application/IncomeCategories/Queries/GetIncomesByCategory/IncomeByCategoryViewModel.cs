namespace Finance.Application.IncomeCategories.Queries.GetIncomesByCategory
{
    public class IncomeByCategoryViewModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int TypeId { get; set; }

        public string TypeDescription { get; set; }

        public decimal Sum { get; set; }
    }
}
