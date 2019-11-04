namespace Finance.Domain.Interfaces
{
    using System;

    public interface IAuditableEntity
    {
        string CreatedBy { get; set; }

        DateTime CreatedOn { get; set; }

        string LastModifiedBy { get; set; }

        DateTime? ModifiedOn { get; set; }
    }
}
