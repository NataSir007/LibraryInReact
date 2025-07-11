using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Library> Libraries { get; set; }
    public required DbSet<LibraryEmailContactDetail> LibraryEmailContactDetails { get; set; }
    public required DbSet<LibraryPhoneNumberContactDetail> LibraryPhoneNumberContactDetails { get; set; }
    public required DbSet<LibraryMailingAddress> LibraryMailingAddresses { get; set; }
    public required DbSet<HolidayWeek> HolidayWeeks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure Library relationships
        modelBuilder.Entity<Library>()
            .HasMany(l => l.LibraryEmailContactDetails)
            .WithOne(e => e.Library)
            .HasForeignKey(e => e.LibraryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Library>()
            .HasMany(l => l.LibraryPhoneNumberContactDetails)
            .WithOne(p => p.Library)
            .HasForeignKey(p => p.LibraryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Library>()
            .HasMany(l => l.LibraryMailingAddresses)
            .WithOne(m => m.Library)
            .HasForeignKey(m => m.LibraryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
