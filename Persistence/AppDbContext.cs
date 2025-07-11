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
    public required DbSet<OpeningHour> OpeningHours { get; set; }

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

        // Configure OpeningHour entity (independent, not linked to libraries)
        modelBuilder.Entity<OpeningHour>(builder =>
        {
            builder.HasKey(oh => oh.Id);
            
            // Enum conversions for database storage
            builder.Property(oh => oh.OpeningHourType)
                .HasConversion<int>();
                
            builder.Property(oh => oh.WeekType)
                .HasConversion<int>();
        });

        // Configure LibraryMailingAddress enum conversion
        modelBuilder.Entity<LibraryMailingAddress>(builder =>
        {
            builder.Property(lma => lma.LocationType)
                .HasConversion<int>();
        });
    }
}
