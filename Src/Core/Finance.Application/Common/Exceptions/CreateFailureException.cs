namespace Finance.Application.Common.Exceptions
{
    using System;

    public class CreateFailureException : Exception
    {
        public CreateFailureException(string name, object key, string message)
            : base($"Creation of entity \"{name}\" ({key}) failed. {message}")
        {
        }
    }
}