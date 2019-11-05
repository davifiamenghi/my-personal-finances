using Finance.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Domain.Entities
{
    public class User : BaseDeletableModel
    {
        public virtual ICollection<Expence> Expences { get; set; }

        public virtual string Email { get; set; }

        public virtual string UserName { get; set; }
    }
}
