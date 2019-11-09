﻿namespace Finance.Persistence.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Domain.Entities;

    public class ExpenseCategoryConfiguration : IEntityTypeConfiguration<ExpenseCategory>
    {
        public void Configure(EntityTypeBuilder<ExpenseCategory> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                   .HasMaxLength(50)
                   .IsRequired();

            builder.HasMany(ec => ec.Expenses)
                   .WithOne(e => e.Category)
                   .HasForeignKey(e => e.CategoryId);
        }
    }
}