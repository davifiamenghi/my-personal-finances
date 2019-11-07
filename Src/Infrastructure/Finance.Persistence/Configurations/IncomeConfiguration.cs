namespace Finance.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Domain.Entities;

    public class IncomeConfiguration : IEntityTypeConfiguration<Income>
    {
        public void Configure(EntityTypeBuilder<Income> builder)
        {
            builder.HasKey(i => i.Id);

            builder.Property(e => e.Merchant)
                   .HasMaxLength(50);

            builder.Property(e => e.Note)
                   .HasMaxLength(200);

            builder.Property(i => i.Date)
                   .IsRequired();
        }
    }
}
