namespace Finance.Domain.Entities
{
    using System;
    using Entities.Common;

    public class Expence : BaseModel
    {
        public string Merchant { get; set; }

        public DateTime Date { get; set; }

        public string Note { get; set; }

        public virtual ExpenceCategory Category { get; set; }

        public virtual User User { get; set; }
    }
}
