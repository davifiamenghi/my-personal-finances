namespace Finance.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Domain.Entities;

    public class FinanceUserConfiguration : IEntityTypeConfiguration<FinanceUser>
    {
        public void Configure(EntityTypeBuilder<FinanceUser> builder)
        {
            builder.HasKey(f => f.Id);

            builder.HasMany(f => f.Incomes)
                   .WithOne(i => i.User)
                   .HasForeignKey(i => i.UserId);

            builder.HasMany(f => f.Expenses)
                   .WithOne(i => i.User)
                   .HasForeignKey(i => i.UserId);
        }
    }
}
