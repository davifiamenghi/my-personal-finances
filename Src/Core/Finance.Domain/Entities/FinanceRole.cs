namespace Finance.Domain.Entities
{
    using Microsoft.AspNetCore.Identity;
    using System;

    public class FinanceRole : IdentityRole<string>
    {
        public FinanceRole()
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }
}
