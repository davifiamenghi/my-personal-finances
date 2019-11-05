namespace Finance.Domain.Entities
{
    using System.Collections.Generic;

    using Common;

    public class ExpenseCategory : BaseDeletableModel
    {
        public ExpenseCategory()
        {
            this.Expenses = new HashSet<Expense>();
        }

        public string Name { get; set; }

        public virtual ICollection<Expense> Expenses { get; private set; }
    }
}
