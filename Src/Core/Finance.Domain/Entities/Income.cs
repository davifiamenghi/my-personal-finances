namespace Finance.Domain.Entities
{
    using System;
    using Entities.Common;

    public class Income : BaseModel
    {
        public string Merchant { get; set; }

        public DateTime Date { get; set; }

        public string Note { get; set; }

        public virtual IncomeCategory Category { get; set; }

        public virtual User User { get; set; }
    }
}
