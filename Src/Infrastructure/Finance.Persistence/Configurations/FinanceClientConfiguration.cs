namespace Finance.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Domain.Entities;

    public class FinanceClientConfiguration : IEntityTypeConfiguration<FinanceClient>
    {
        public void Configure(EntityTypeBuilder<FinanceClient> builder)
        {
            builder.HasKey(f => f.Id);

            builder.HasMany(f => f.Incomes)
                   .WithOne(i => i.Client)
                   .HasForeignKey(i => i.ClientId);

            builder.HasMany(f => f.Expenses)
                   .WithOne(i => i.Client)
                   .HasForeignKey(i => i.ClientId);
        }
    }
}
