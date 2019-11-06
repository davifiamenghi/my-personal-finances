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

        public string ClientId { get; set; }

        public virtual FinanceClient Client { get; set; }
    }
}
