namespace Finance.Domain.Entities.Common
{
    using System;

    using Interfaces;

    public abstract class BaseDeletableModel<TKey> : BaseModel, IDeletableEntity
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
