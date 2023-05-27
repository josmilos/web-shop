using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShopAPI.Models;

namespace WebShopAPI.Infrastructure.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.ProductId); // Primary key of table
            builder.Property(x => x.ProductId).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).HasMaxLength(20);
            builder.Property(x => x.Description).HasMaxLength(200);








            builder.HasOne(x => x.Seller)
                .WithMany(x => x.UserProducts)
                .HasForeignKey(x => x.SellerId)
                .IsRequired(false);

        }
    }
}
