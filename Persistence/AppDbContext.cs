using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Event> Events { get; set; }
    public required DbSet<EventTag> EventTags { get; set; }
    public required DbSet<EventTranslation> EventTranslations { get; set; }
    public required DbSet<Library> Libraries { get; set; }
    public required DbSet<LibraryEmailContactDetail> LibraryEmailContactDetails { get; set; }
    public required DbSet<LibraryNoteTranslation> LibraryNoteTranslations { get; set; }
    public required DbSet<LibraryPhoneNumberContactDetail> LibraryPhoneNumberContactDetails { get; set; }
    public required DbSet<LibraryMailingAddress> LibraryMailingAddresses { get; set; }
    public required DbSet<LibraryImage> LibraryImages { get; set; }
    public required DbSet<HolidayWeek> HolidayWeeks { get; set; }
    public required DbSet<OpeningHour> OpeningHours { get; set; }
    public required DbSet<Tag> Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Configure Event entity
        modelBuilder.Entity<EventTag>()
            .HasKey(et => new { et.EventId, et.TagId });

        modelBuilder.Entity<EventTag>()
            .HasOne(et => et.Event)
            .WithMany(e => e.EventTags)
            .HasForeignKey(et => et.EventId);

        modelBuilder.Entity<EventTag>()
            .HasOne(et => et.Tag)
            .WithMany(t => t.EventTags)
            .HasForeignKey(et => et.TagId);

        // Configure Library relationships
        modelBuilder.Entity<Library>()
            .HasMany(l => l.LibraryEmailContactDetails)
            .WithOne(e => e.Library)
            .HasForeignKey(e => e.LibraryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Library>()
        .HasMany(l => l.NoteTranslations)
        .WithOne(nt => nt.Library)
        .HasForeignKey(nt => nt.LibraryId);

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

        modelBuilder.Entity<Library>()
            .HasMany(l => l.LibraryImages)
            .WithOne(i => i.Library)
            .HasForeignKey(i => i.LibraryId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure LibraryImage entity
        modelBuilder.Entity<LibraryImage>(builder =>
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.FileName).IsRequired();
            builder.Property(i => i.AltText).IsRequired();
        });

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
