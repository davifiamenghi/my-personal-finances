namespace Finance.Domain.Entities
{
    using System.Collections.Generic;

    using Common;

    public class FinanceClient : BaseDeletableModel
    {
        public FinanceClient()
        {
            this.Expenses = new HashSet<Expense>();
            this.Incomes = new HashSet<Income>();
        }
        public virtual ICollection<Expense> Expenses { get; private set; }

        public virtual ICollection<Income> Incomes { get; private set; }

        public virtual string Email { get; set; }

        public virtual string UserName { get; set; }
    }
}
