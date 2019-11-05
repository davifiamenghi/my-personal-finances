namespace Finance.Domain.Entities
{
    using System.Collections.Generic;

    using Common;

    public class IncomeCategory : BaseDeletableModel
    {
        public IncomeCategory()
        {
            this.Incomes = new HashSet<Income>();
        }

        public string Name { get; set; }

        public virtual ICollection<Income> Incomes { get; private set; }
    }
}
