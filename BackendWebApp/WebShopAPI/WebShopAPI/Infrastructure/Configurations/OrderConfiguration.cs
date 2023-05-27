using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShopAPI.Models;

namespace WebShopAPI.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.OrderId); // Primary key of table
            builder.Property(x => x.OrderId).ValueGeneratedOnAdd();

            builder.Property(x => x.Comment).HasMaxLength(100);
            builder.Property(x => x.Address).HasMaxLength(50);

            builder.HasOne(x => x.UserBuyer)
                .WithMany(x => x.CreatedOrders)
                .HasForeignKey(x => x.UserBuyerId)
                .IsRequired(false);

            
            builder.HasMany(x => x.OrderProducts)
                .WithMany(x => x.Orders);
        }
    }
}
