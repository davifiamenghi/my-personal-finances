namespace Finance.Application.Common.Exceptions
{
    using System;

    public class UpdateFailureException : Exception
    {
        public UpdateFailureException(string name, object key, string message)
            : base($"Updation of entity \"{name}\" ({key}) failed. {message}")
        {
        }
    }
}