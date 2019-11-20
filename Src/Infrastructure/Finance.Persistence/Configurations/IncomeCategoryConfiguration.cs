namespace Finance.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Domain.Entities;

    public class IncomeCategoryConfiguration : IEntityTypeConfiguration<IncomeCategory>
    {
        public void Configure(EntityTypeBuilder<IncomeCategory> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                   .HasMaxLength(20)
                   .IsRequired();

            builder.Property(c => c.UserId)
                   .IsRequired();

            builder.Property(c => c.TypeId)
                   .IsRequired();

            builder.HasMany(ec => ec.Incomes)
                   .WithOne(e => e.Category)
                   .HasForeignKey(e => e.CategoryId)
                   .OnDelete(DeleteBehavior.Restrict);            
        }
    }
}
