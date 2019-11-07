using Finance.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Domain.Entities
{
    public class FinanceUser : IdentityUser<string>
    {
        public FinanceUser()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public ICollection<Expense> Expenses { get; private set; }

        public ICollection<Income> Incomes { get; private set; }
    }
}
