namespace Finance.Domain.Entities
{
    using System;

    using Common;

    public class Expense : BaseModel
    {
        public string Merchant { get; set; }

        public DateTime Date { get; set; }

        public string Note { get; set; }

        public string CategoryId { get; set; }

        public virtual ExpenseCategory Category { get; set; }

        public string UserId { get; set; }

        public virtual FinanceUser User { get; set; }
    }
}
