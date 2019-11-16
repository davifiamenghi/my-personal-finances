namespace Finance.Domain.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public class CashflowType
    {
        public CashflowType()
        {
            this.ExpenseCategories = new HashSet<ExpenseCategory>();
            this.IncomeCategories = new HashSet<IncomeCategory>();
        }

        public int Id { get; set; }

        public string Description { get; set; }

        public virtual ICollection<ExpenseCategory> ExpenseCategories { get; private set; }

        public virtual ICollection<IncomeCategory> IncomeCategories { get; private set; }
    }
}
