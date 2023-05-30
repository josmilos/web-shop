using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShopAPI.Models;

namespace WebShopAPI.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.UserId); // Primary key of table
            builder.Property(x => x.UserId).ValueGeneratedOnAdd();

            builder.Property(x => x.UserName).HasMaxLength(20);
            builder.HasIndex(x => x.UserName).IsUnique();

            builder.Property(x => x.FirstName).HasMaxLength(30);
            builder.Property(x => x.LastName).HasMaxLength(30);

            builder.Property(x => x.Email).HasMaxLength(30);
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.Password).HasMaxLength(500);
            builder.Property(x => x.UserType).HasMaxLength(10);
            builder.Property(x => x.Address).HasMaxLength(50);

        }
    }
}
