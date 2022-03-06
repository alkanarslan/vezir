using Microsoft.EntityFrameworkCore;
using vezir.api.Model;



namespace vezir.api;
public class VezirApiContext : DbContext
    {
        public VezirApiContext(DbContextOptions options) :base(options) {}
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<CurrentAccount> CurrentAccount { get; set; }
        public virtual DbSet<Lookup> Lookup { get; set; }
        public virtual DbSet<Declarations> Declarations { get; set; }
        public virtual DbSet<TaxOffice> TaxOffice  { get; set; }
        public virtual DbSet<FirmDeclarations> FirmDeclarations { get; set; }
        public virtual DbSet<PlanningDeclarations> PlanningDeclarations { get; set; }
        public virtual DbSet<PlanningDeclarationsVerification> PlanningDeclarationsVerification { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RefreshToken>(entity =>
            {
               
                entity.Property(e => e.ExpiryDate).HasColumnType("smalldatetime");
                entity.Property(e => e.TokenHash)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.TokenSalt)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.Ts)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("TS");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RefreshTokens)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RefreshToken_User");

                entity.ToTable("RefreshToken");
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Ts)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("TS");

                entity.ToTable("User");

            });

       
        }

       
    }
