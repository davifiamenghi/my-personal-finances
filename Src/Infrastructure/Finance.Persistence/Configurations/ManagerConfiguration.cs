namespace Finance.Persistence.Configurations
{  
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class ManagerConfiguration : IEntityTypeConfiguration<Manager>
    {
        public void Configure(EntityTypeBuilder<Manager> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.FirstName)
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(c => c.LastName)
                   .HasMaxLength(50)
                   .IsRequired();
        }
    }
}