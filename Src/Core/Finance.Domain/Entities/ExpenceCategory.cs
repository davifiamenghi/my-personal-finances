namespace Finance.Domain.Entities
{
    using System.Collections.Generic;

    using Common;

    public class ExpenceCategory : BaseDeletableModel
    {
        public ExpenceCategory()
        {
            this.Expences = new HashSet<Expence>();
        }

        public string Name { get; set; }

        public virtual ICollection<Expence> Expences { get; private set; }
    }
}
