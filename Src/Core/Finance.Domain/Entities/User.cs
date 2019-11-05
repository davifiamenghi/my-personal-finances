namespace Finance.Domain.Entities
{
    using Finance.Domain.Entities.Common;
    using System.Collections.Generic;

    public class User : BaseDeletableModel
    {
        public User()
        {
            this.Expenses = new HashSet<Expense>();
        }
        public virtual ICollection<Expense> Expenses { get; set; }

        public virtual string Email { get; set; }

        public virtual string UserName { get; set; }
    }
}
