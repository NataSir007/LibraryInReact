using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Event> Events { get; set; }
    public required DbSet<EventImage> EventImages { get; set; }
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
    // User authentication entities
    public required DbSet<User> Users { get; set; }
    public required DbSet<LibraryCard> LibraryCards { get; set; }
    public required DbSet<DebtRecord> DebtRecords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Configure EventImage entity for one-to-one relationship with Event
        modelBuilder.Entity<EventImage>(builder =>
        {
            builder.HasKey(ei => ei.Id);
            builder.Property(ei => ei.FileName).IsRequired();
            builder.Property(ei => ei.AltText).IsRequired();
            builder.Property(ei => ei.FilePath).IsRequired();
            builder.HasOne(ei => ei.Event)
                .WithOne(e => e.EventImage)
                .HasForeignKey<EventImage>(ei => ei.EventId)
                .OnDelete(DeleteBehavior.Cascade);
        });

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

        // Configure User entity
        modelBuilder.Entity<User>(builder =>
        {
            builder.HasKey(u => u.Id);
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Property(u => u.Status).HasConversion<int>();
            builder.Property(u => u.NotificationPreference).HasConversion<int>();            
            
        });

        // Configure LibraryCard entity
        modelBuilder.Entity<LibraryCard>(builder =>
        {
            builder.HasKey(lc => lc.Id);
            builder.HasIndex(lc => lc.CardNumber).IsUnique();
            builder.Property(lc => lc.Status).HasConversion<int>();
            
            builder.HasOne(lc => lc.User)
                .WithMany(u => u.LibraryCards)
                .HasForeignKey(lc => lc.UserId)
                .OnDelete(DeleteBehavior.Cascade);
                
        });

        // Configure DebtRecord entity
        modelBuilder.Entity<DebtRecord>(builder =>
        {
            builder.HasKey(dr => dr.Id);
            builder.Property(dr => dr.Amount).HasColumnType("decimal(10,2)");
            builder.Property(dr => dr.Status).HasConversion<int>();
            builder.Property(dr => dr.Type).HasConversion<int>();
            
            builder.HasOne(dr => dr.User)
                .WithMany(u => u.DebtRecords)
                .HasForeignKey(dr => dr.UserId)
                .OnDelete(DeleteBehavior.Cascade);
                
            builder.HasOne(dr => dr.LibraryCard)
                .WithMany(lc => lc.DebtRecords)
                .HasForeignKey(dr => dr.LibraryCardId)
                .OnDelete(DeleteBehavior.Cascade);                
            
        });
    }
}
