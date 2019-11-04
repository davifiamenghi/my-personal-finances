namespace Finance.Application.Common.Exceptions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using FluentValidation.Results;

    using Finance.Common.GlobalContants;

    public class ValidationException : Exception
    {
        public ValidationException()
            : base(ApplicationConstants.BaseExceptionMessage)
        {
            this.Failures = new Dictionary<string, string[]>();
        }

        public ValidationException(List<ValidationFailure> failures)
            : this()
        {
            var propertyNames = failures
                .Select(e => e.PropertyName)
                .Distinct();

            foreach (var propertyName in propertyNames)
            {
                var propertyFailures = failures
                    .Where(e => e.PropertyName == propertyName)
                    .Select(e => e.ErrorMessage)
                    .ToArray();

                this.Failures.Add(propertyName, propertyFailures);
            }
        }

        public IDictionary<string, string[]> Failures { get; }
    }
}
