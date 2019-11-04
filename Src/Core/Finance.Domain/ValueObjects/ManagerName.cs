namespace Finance.Domain.ValueObjects
{
    using System;
    using System.Collections.Generic;

    using Entities.Common;
    using Exceptions;

    public class ManagerName : ValueObject<ManagerName>
    {
        private ManagerName()
        {
        }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public static ManagerName For(string accountString)
        {
            var managerName = new ManagerName();

            try
            {
                var index = accountString.IndexOf(" ", StringComparison.Ordinal);
                managerName.FirstName = accountString.Substring(0, index);
                managerName.LastName = accountString.Substring(index + 1);
            }
            catch (ArgumentException)
            {
                throw new ManagerNameInvalidException(new ArgumentException());
            }

            return managerName;
        }

        public static implicit operator string(ManagerName managerName)
        {
            return managerName.ToString();
        }

        public static explicit operator ManagerName(string managerString)
        {
            return For(managerString);
        }

        public override string ToString()
        {
            return $"{this.FirstName} {this.LastName}";
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return this.FirstName;
            yield return this.LastName;
        }
    }
}

