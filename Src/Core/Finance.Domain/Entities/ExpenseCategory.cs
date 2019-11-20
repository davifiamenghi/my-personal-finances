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

        public string UserId { get; set; }

        public virtual FinanceUser User { get; set; }

        public int TypeId { get; set; }

        public virtual CashflowType Type { get; set; }

        public virtual ICollection<Expense> Expenses { get; private set; }
    }
}
