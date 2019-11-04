namespace Finance.Domain.Exceptions
{
    using System;

    using Common.GlobalContants;

    public class ManagerNameInvalidException : Exception
    {
        public ManagerNameInvalidException(Exception ex)
            : base(DomainContants.ManagerExceptionMessage, ex)
        {
        }
    }
}
