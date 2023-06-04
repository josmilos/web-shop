using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShopAPI.Models;

namespace WebShopAPI.Infrastructure.Configurations
{
    public class ProductOrderConfiguration : IEntityTypeConfiguration<ProductOrder>
    {
        public void Configure(EntityTypeBuilder<ProductOrder> builder)
        {
            builder.HasKey(x => x.ProductOrderId); // Primary key of table
            builder.Property(x => x.ProductOrderId).ValueGeneratedOnAdd();

            builder.HasOne(x => x.Order)
                .WithMany(x => x.OrderProducts)
                .HasForeignKey(x => x.OrderId)
                .IsRequired(false);

            
        }
    }
}
