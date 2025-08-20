using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

public class LibraryServiceTests
{
    [Fact]
    public async Task GetLibrariesAsync_ReturnsCorrectNumberOfLibraries()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetLibrariesReturnsCorrectCount")
            .Options;

        // Seed the database
        using (var context = new AppDbContext(options))
        {
            context.Libraries.Add(new Library { Id = 1, Title = "Central Library", Address = "123 Main St" });
            context.Libraries.Add(new Library { Id = 2, Title = "Branch Library", Address = "456 Side St" });
            await context.SaveChangesAsync();
        }

        // Act
        using (var context = new AppDbContext(options))
        {
            var service = new LibraryService(context);
            var result = await service.GetLibrariesAsync();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Contains(result, l => l.Id == 1 && l.Title == "Central Library");
            Assert.Contains(result, l => l.Id == 2 && l.Title == "Branch Library");
        }
    }

    [Fact]
    public async Task GetLibraryByIdAsync_ReturnsCorrectLibrary()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetLibraryByIdReturnsCorrectLibrary")
            .Options;

        // Seed the database
        using (var context = new AppDbContext(options))
        {
            context.Libraries.Add(new Library { Id = 1, Title = "Central Library", Address = "123 Main St" });
            await context.SaveChangesAsync();
        }

        // Act
        using (var context = new AppDbContext(options))
        {
            var service = new LibraryService(context);
            var result = await service.GetLibraryByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("Central Library", result.Title);
        }
    }

    [Fact]
    public async Task GetOpeningHoursAsync_HandlesRegularWeekCorrectly()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetOpeningHoursHandlesRegular")
            .Options;

        // Seed the database
        using (var context = new AppDbContext(options))
        {
            // Add regular opening hours
            context.OpeningHours.Add(new OpeningHour 
            { 
                Id = 1,
                WeekType = WeekType.RegularWeek, 
                OpeningHourType = OpeningHourType.Workday,
                OpeningTime = new TimeOnly(9, 0),
                ClosingTime = new TimeOnly(20, 0)
            });
            
            context.OpeningHours.Add(new OpeningHour 
            { 
                Id = 2,
                WeekType = WeekType.RegularWeek, 
                OpeningHourType = OpeningHourType.Friday,
                OpeningTime = new TimeOnly(9, 0),
                ClosingTime = new TimeOnly(18, 0)
            });
            
            await context.SaveChangesAsync();
        }

        // Act
        using (var context = new AppDbContext(options))
        {
            var service = new LibraryService(context);
            var result = await service.GetOpeningHoursAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(7, result.Days.Count);
            
            // Monday-Thursday should have 9-20
            var monday = result.Days.First(d => d.Day == "Mon");
            Assert.Equal("09–20", monday.OpeningTime);
            
            // Friday should have 9-18
            var friday = result.Days.First(d => d.Day == "Fri");
            Assert.Equal("09–18", friday.OpeningTime);
        }
    }

    [Fact]
    public async Task GetLibraryOpenStatusAsync_ReturnsOpenWhenWithinOpeningHours()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetLibraryOpenStatusReturnsOpen")
            .Options;

        // Seed the database
        using (var context = new AppDbContext(options))
        {
            context.Libraries.Add(new Library { Id = 1, Title = "Central Library", Address = "123 Main St" });
            context.OpeningHours.Add(new OpeningHour 
            { 
                Id = 1,
                WeekType = WeekType.RegularWeek, 
                OpeningHourType = OpeningHourType.Workday,
                OpeningTime = new TimeOnly(9, 0),
                ClosingTime = new TimeOnly(20, 0)
            });
            await context.SaveChangesAsync();
        }

        // Act
        using (var context = new AppDbContext(options))
        {
            var service = new LibraryService(context);
            var result = await service.GetLibraryOpenStatusAsync(1, DateTime.Now);

            // Assert
            Assert.Equal(LibraryOpenStatus.Open, result);
        }
    }
}