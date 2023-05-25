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
            throw new NotImplementedException();
        }
    }
}
