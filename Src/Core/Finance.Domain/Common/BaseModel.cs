namespace Finance.Domain.Entities.Common
{
    using System;

    using Interfaces;

    public abstract class BaseModel : IAuditableEntity
    {
        public BaseModel()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public string LastModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
